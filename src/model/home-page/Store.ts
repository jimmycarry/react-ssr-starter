import { observable, action } from 'mobx';

interface HomePageModel{
    title?: string,
}

export interface HomePageProps{

    title?: string;
    changeTitle: () => void;
}

export class HomePageStore{
    @observable title: string = 'Welcome Home Page';
    constructor({title='Welcome Home Page'}:HomePageModel) {
        this.title = title;
    }
    @action.bound
    changeTitle() {
        this.title = 'I\'m jimmy Ye';
    }

}
