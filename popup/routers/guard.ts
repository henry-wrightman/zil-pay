/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import { get } from 'svelte/store';
import { push } from 'svelte-spa-router';

import appStore from 'popup/store/apps';
import guardStore from 'popup/store/guard';
import loadedStore from 'app/store/loaded';
import { getState } from 'popup/backend';

export const routerGuard = async (e) => {
  const loaded = get(loadedStore);
  if (!loaded) {
    await getState();
  }
  const guard = get(guardStore);
  const apps = get(appStore);

  if (!guard.isReady) {
    push('/start');
  }

  if (guard.isReady && !guard.isEnable) {
    push('/lock');
  }

  const router = '/app-connect';
  if (apps.confirmApp && e.location !== router) {
    push(router);
  }

  return guard.isEnable && guard.isReady;
}
