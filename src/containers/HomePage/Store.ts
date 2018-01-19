import { action, observable } from 'mobx';

interface IHomePageModel {
    title?: string;
}

export interface IHomePageProps {

    title?: string;
    changeTitle: () => void;
}

export class HomePageStore {
    @observable title: string = '志明的个人技术部落';
    @observable topic: string[] = ['Web前后端', 'Python', 'Go', '人工只能'];
    constructor({ title = '志明的个人技术部落' }: IHomePageModel) {
        this.title = title;
    }
    @action.bound
    changeTitle() {
        // this.title = 'I\'m jimmy Ye';
    }

}
