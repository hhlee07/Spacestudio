import { action, makeObservable, observable } from "mobx";

export class ModelStore {
    rootStore;

    model = [];
    firstMed = null;
    boundingbox = [];

    constructor(root) {
        makeObservable(this, {
            model: observable,
            addModel: action,
            addAsset: action,
            boundingbox: observable,
            addBoundingBox: action
        })

        this.rootStore = root;
    }

    addModel = (newModel) => {
        this.model = [...this.model, ...newModel['components']];
        this.firstMed = newModel['firstMed'];
    }

    addAsset = (newAsset) => {
        this.model = [...this.model, newAsset];
    }

    addBoundingBox = (newBB) => {
        this.boundingbox = [...this.boundingbox, newBB['boundingbox']];
    }

}
