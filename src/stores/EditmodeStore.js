import { action, makeObservable, observable } from "mobx";

export class EditmodeStore {
    rootStore;

    isEdit = false;

    constructor(root) {
        makeObservable(this, {
            isEdit: observable,
            setIsEdit: action
        })

        this.rootStore = root;
    }

    setIsEdit = (bool) => {
        this.isEdit = bool;
    }
}