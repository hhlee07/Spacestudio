import { action, makeObservable, observable } from "mobx";

export class IndoormodeStore {
    rootStore;

    value = 0;

    constructor(root) {
        makeObservable(this, {
            value: observable,
            setValue: action
        })

        this.rootStore = root;
    }

    setValue = () => {
        this.value ? (this.value = 0) : (this.value = 1);
    }
}