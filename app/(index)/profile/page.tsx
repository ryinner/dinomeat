import TheUserForm from '@/components/Forms/TheUserForm';
import { findUserForSite } from '@/services/orm/users.service';
import { Session, getServerSession } from 'next-auth';
import styles from './page.module.scss';

export default async function Profile () {
  const session = await getServerSession() as Session;
  const user = await findUserForSite(session.user.id);

  return <section className={styles.section}>
    <TheUserForm user={user} />
  </section>
}