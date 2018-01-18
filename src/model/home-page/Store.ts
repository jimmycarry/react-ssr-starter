import { action, observable } from 'mobx';

interface IHomePageModel {
    title?: string;
}

export interface IHomePageProps {

    title?: string;
    changeTitle: () => void;
}

export class HomePageStore {
    @observable title: string = 'Welcome Home Page';
    constructor({ title = 'Welcome Home Page' }: IHomePageModel) {
        this.title = title;
    }
    @action.bound
    changeTitle() {
        this.title = 'I\'m jimmy Ye';
    }

}
