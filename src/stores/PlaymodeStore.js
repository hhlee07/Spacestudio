import { action, makeObservable, observable } from "mobx";

export class PlaymodeStore {
    rootStore;

    playMode = false;
    pauseState = false;

    constructor(root) {
        makeObservable(this, {
            playMode : observable,
            pauseState : observable,

            pause : action,
            play : action,
            enterPm : action,
            exitPm : action
        })

        this.rootStore = root;

        //this.playMode = false;
        //this.pauseState = false;

    }

    pause = () => {
        this.pauseState = true;
    };

    play = () => {
        this.pauseState = false;
    };

    enterPm = () => {
        this.playMode = true;
    };

    exitPm = () => {
        this.playMode = false;
    };
    
}
