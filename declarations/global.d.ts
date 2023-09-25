declare var VK: VKInterface;

declare interface VKInterface {
  init: (settings: VKInitializationSettings) => void;
  Widgets: VKWidgetsInterface;
}

declare interface VKInitializationSettings {
  apiId: string;
  status?: boolean;
  onlyWidgets?: boolean;
}

declare interface VKWidgetsInterface {
  CommunityMessages(elementId: string, groupId: number|string, options?: VKWidgetsCommunityMessagesOptionsInterface): VKCommunityMessagesWidgetInterface
}

declare interface VKWidgetsCommunityMessagesOptionsInterface {
  onCanNotWrite?: (callback: () => void) => void;
  welcomeScreen?: 1|0,
  expandTimeout?: number;
  expanded?: number;
  widgetPosition?: 'left'|'right';
  buttonType?: 'no_button'|'blue_circle';
  disableButtonTooltip?: number;
  tooltipButtonText?: string;
  disableNewMessagesSound?: number;
  disableExpandChatSound?: number;
  disableTitleChange?: number;
}

declare interface VKCommunityMessagesWidgetInterface {
  destroy: () => void;
  expand: (welcomeScreen?: number) => void;
  stopTitleAnimation: () => void;
  minimize: () => void;
}