'use client';

import { ProductSeoWithSeo } from "@/@types/private";
import Button from "@/components/Button/Button";
import ControlsEditor from "@/components/Controls/ControlsEditor";
import { frontRequest } from "@/services/api/api.service";
import { updateObjectField } from "@/services/dom/input";
import { Seo } from "@prisma/client";
import { FormEvent } from "react";
import { useImmer } from "use-immer";

export default function ProductsEditSeo({
  id: productId,
  seo: initialSeo,
}: Props) {
  const [seo, updateSeo] = useImmer(
    initialSeo ?? { id: undefined, name: "", keywords: "", description: "" }
  );

  async function updateSeoField(e: FormEvent<HTMLInputElement>) {
    updateObjectField(e, seo, (p, v) => {
      updateSeo((seo) => {
        (seo[p] as typeof v) = v;
      });
    });
  }

  async function submitSeoHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (seo.id) {
      frontRequest(
        `/api/admin/seo/${seo.id}`,
        {
          method: "PUT",
          body: JSON.stringify(seo),
        },
        { withMessage: true }
      );
    } else {
      frontRequest<{ product: { seo: ProductSeoWithSeo[] } }>(
        `/api/admin/products/${productId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            data: {
              seo: {
                create: {
                  seo: {
                    create: seo,
                  },
                },
              },
            },
            select: { seo: { include: { seo: true } } },
          }),
        },
        { withMessage: true }
      ).then((res) => {
        updateSeo((seo) => {
          seo.id = res.product.seo[0].seo.id;
        });
      });
    }
  }

  return (
    <form onSubmit={submitSeoHandler}>
      <fieldset>
        <legend>Seo базовая информация</legend>
        <label>
          Название:
          <input
            name="name"
            type="text"
            value={seo.name}
            onInput={updateSeoField}
          />
        </label>
        <label>
          Ключевые слова:
          <input
            name="keywords"
            type="text"
            value={seo.keywords ?? ""}
            onInput={updateSeoField}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Seo описание</legend>
        <ControlsEditor
          value={seo.description ?? ""}
          onInput={(text) => {
            updateSeo((seo) => {
              seo.description = text;
            });
          }}
        />
      </fieldset>
      <Button type="submit">Сохранить</Button>
    </form>
  );
}

interface Props {
  id: number;
  seo?: Seo;
}
