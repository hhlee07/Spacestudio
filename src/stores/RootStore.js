import { PlaymodeStore } from "./PlaymodeStore";
import { ControlStore } from "./ControlStore";
import { ModelStore } from "./ModelStore";
import { SidebarStore } from "./SidebarStore";
import { PortalStore } from "./PortalStore";
import { IndoormodeStore } from "./IndoormodeStore";
import { EditmodeStore } from "./EditmodeStore";

export class RootStore{
    PlaymodeStore;
    ControlStore;
    ModelStore;
    SidebarStore;
    PortalStore;
    IndoormodeStore;
    EditmodeStore;
    // 다른 Store들 여기에 계속 추가

    constructor() {
        this.PlaymodeStore = new PlaymodeStore(this);
        this.ControlStore = new ControlStore(this);
        this.ModelStore = new ModelStore(this);
        this.SidebarStore = new SidebarStore(this);
        this.PortalStore = new PortalStore(this);
        this.IndoormodeStore = new IndoormodeStore(this);
        this.EditmodeStore = new EditmodeStore(this);
    }
}