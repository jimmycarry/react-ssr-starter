import { HomePageStore } from './model/home-page/Store';

export interface AppStore{
    HomePage?: HomePageStore
}

export const appStore: AppStore = {
    HomePage: new HomePageStore({}),
};


export const Store = {
    HomePage: HomePageStore,
}
