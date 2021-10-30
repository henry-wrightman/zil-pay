/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import { wrap } from 'svelte-spa-router/wrap';
import { routerGuard } from './guard';

import LockPage from '../pages/Lock.svelte';
import LetStarted from '../pages/LetStarted.svelte';
import Home from '../pages/Home.svelte';
import Loading from '../pages/Loading.svelte';
import Create from '../pages/Create.svelte';
import Restore from '../pages/Restore.svelte';
import SetupAccount from '../pages/SetupAccount.svelte';
import WalletCreated from '../pages/WalletCreated.svelte';

export default {
  '/home': wrap({
    component: Home,
    conditions: [
      routerGuard
    ]
  }),
  '/setup-account': wrap({
    component: SetupAccount,
    conditions: [
      routerGuard
    ]
  }),
  '/created': wrap({
    component: WalletCreated,
    conditions: [
      routerGuard
    ]
  }),
  '/lock': LockPage,
  '/start': LetStarted,
  '/restore': Restore,
  '/create': Create,

  // Catch-all
  // This is optional, but if present it must be the last
  '*': Loading
};
