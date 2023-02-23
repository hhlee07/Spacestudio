import { action, makeObservable, observable } from "mobx";
import { Vector3 } from 'three';
import * as THREE from 'three'

class BuildingInfo {
    id;
    name;
    category;
    position;
    rotation;
    scale;
    floorShape;
    boundingBox;

    constructor(id, name, category, position, rotation, scale, floorShape, boundingBox) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.floorShape = floorShape;
        this.boundingBox = boundingBox;
    }
}

class AssetInfo {
    id;
    name;
    category;
    position;
    rotation;
    scale;

    constructor(id, name, category, position, rotation, scale) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}

class Transform {
    position;
    rotation;
    scale;

    constructor(position, rotation, scale) {
        this.position = position,
            this.rotation = rotation,
            this.scale = scale
    }
}

class Cube {
    geometry;
    material;

    constructor(geometry, material) {
        this.geometry = geometry,
            this.material = material
    }
}

export class SidebarStore {
    rootStore;

    selected = false;
    item = null;
    current = ''; // [building, asset];
    distance = 1;
    transform = new Transform(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    cameraposition = [0, 5, 10];
    cube = new Cube(new THREE.BoxBufferGeometry(2, 2, 2), new THREE.MeshNormalMaterial())

    constructor(root) {
        makeObservable(this, {
            selected: observable,
            item: observable,
            current: observable,
            transform: observable,
            cube: observable,
            selectBuilding: action,
            selectAsset: action,
            unselect: action,
            update3D: action,
            updateCube: action,
            distance: observable,
            distplayer: action,
            cameraposition: observable,
            setcampos: action

        })

        this.rootStore = root;
    }

    selectBuilding = (id, name, category, position, rotation, scale, floorShape, boundingBox) => {
        this.selected = true;
        this.current = 'building';
        this.item = new BuildingInfo(id, name, category, position, rotation, scale, floorShape, boundingBox);
    }

    selectAsset = (id, name, category, position, rotation, scale) => {
        this.selected = true;
        this.current = 'asset';
        this.item = new AssetInfo(id, name, category, position, rotation, scale);
    }

    unselect = () => {
        this.selected = false;
        this.current = '';
        this.item = null;
    }

    update3D = (position, rotation, scale) => {
        this.transform = new Transform(position, rotation, scale);
    }

    updateCube = (geometry, material) => {
        this.cube = new Cube(geometry, material);
    }

    distplayer = (val) => {
        this.distance = val
    }

    setcampos = (x, y, z) => {
        // this.cameraposition = val.toArray()
        this.cameraposition = [x, y, z];
    }

    setlockorbit = () => {
        this.lockorbit = true;
    }

    setorbit = () => {
        this.lockorbit = false;
    }

}
