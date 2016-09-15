export const CHAT_FILE_CLEAN = 'CHAT_FILE_CLEAN';

export function cleanChatFiles(contact, localFileId) {
  return {
    type: CHAT_FILE_CLEAN,
    contact,
    localFileId,
  };
}
