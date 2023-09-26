declare var VK: vk.OpenApi.Api;

declare namespace vk {
  namespace OpenApi {
    type NumericBoolean = 0 | 1;
    interface Api {
      init: (settings: InitializationSettings) => void;
      Widgets: Widgets.Widgets;
    }
    namespace Widgets {
      interface Widgets {
        CommunityMessages(elementId: string, groupId: number, options?: CommunityMessages.Options): CommunityMessages.Widget
      }
      namespace CommunityMessages {
        interface Options {
          onCanNotWrite?: (callback: (reason: OnCanNotWriteReason) => void) => void;
          welcomeScreen?: NumericBoolean,
          expandTimeout?: number;
          expanded?: NumericBoolean;
          widgetPosition?: 'left'|'right';
          buttonType?: 'no_button'|'blue_circle';
          disableButtonTooltip?: NumericBoolean;
          tooltipButtonText?: string;
          disableNewMessagesSound?: NumericBoolean;
          disableExpandChatSound?: NumericBoolean;
          disableTitleChange?: NumericBoolean;
        }
        interface Widget {
          destroy: () => void;
          expand: (welcomeScreen?: number) => void;
          stopTitleAnimation: () => void;
          minimize: () => void;
        }

        type OnCanNotWriteReason = 'offline' | 'no_access' | 'disabled_messages' | 'cant_write';
      }
    }
    interface InitializationSettings {
      apiId: string;
      status?: boolean;
      onlyWidgets?: boolean;
    }
  }
}