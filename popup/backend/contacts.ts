/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import type { Contact } from "types/contact";
import { Message } from "lib/streem/message";
import { MTypePopup } from "lib/streem/stream-keys";
import { warpMessage } from "lib/utils/warp-message";

export async function addContact(contact: Contact) {
  const data = await new Message({
    type: MTypePopup.ADD_CONTACT,
    payload: {
      contact
    }
  }).send();
  return warpMessage(data);
}
