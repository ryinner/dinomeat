export const VK_COMMUNITY_MESSAGES_ID = 'vk__community-messages';

export function init (): void {
  VK.init({
    apiId: process.env.NEXT_PUBLIC_VK_ID!,
    onlyWidgets: true
  });
}

export function createCommunityMessageWidget (): vk.OpenApi.Widgets.CommunityMessages.Widget {
  return VK.Widgets.CommunityMessages(VK_COMMUNITY_MESSAGES_ID, +process.env.NEXT_PUBLIC_VK_GROUP_ID!, {
    onCanNotWrite: () => { console.log('Вы не можете писать, открыть попап') }, //TODO
    buttonType: 'blue_circle',
    welcomeScreen: 1,
    expandTimeout: 300,
    widgetPosition: 'right',
    tooltipButtonText: 'Есть вопросы?',
    disableTitleChange: 1,
    disableNewMessagesSound: 1
  });
}