import React, { useState, useEffect, useRef } from 'react';
import * as SharedStyle from '../shared-style';
import * as Geometry from '../utils/geometry';

const thickness = 6;

const getPlannerState = function (buildingName) {
    if (!localStorage) return;
    let json;

    if (localStorage.getItem(buildingName) !== null) {
        let data = localStorage.getItem(buildingName);
        json = JSON.parse(data);
    }
    else {
        return;
    }
    return json;
}

const getLayer = function(plannerState) {
  let selectedLayer = plannerState.layers[plannerState.selectedLayer];
  return selectedLayer;
}

const getVertex = function(selectedLayer, widthRatio, heightRatio, height) {
  const VERTEX_STYLE = {fill: "#0096fd", stroke: SharedStyle.COLORS.white};
  const vertexComponent = [];
  for (var vertex in selectedLayer.vertices) {
    vertexComponent.push(
      <g
      transform={`translate(${selectedLayer.vertices[vertex].x * widthRatio}, ${height - selectedLayer.vertices[vertex].y * heightRatio})`}
      data-id={vertex.id}>
        <circle cx="0" cy="0" r={thickness/2} style={VERTEX_STYLE}/>
      </g>
    );
  }
  return vertexComponent;
}

const getLine = function (selectedLayer, widthRatio, heightRatio, height) {
  const STYLE_RECT = { strokeWidth: 1, stroke: SharedStyle.COLORS.white, fill: SharedStyle.COLORS.black };
  const lineComponent = [];
  for (var line in selectedLayer.lines) {
    let { x: x1, y: y1 } = selectedLayer.vertices[selectedLayer.lines[line].vertices[0]];
    let { x: x2, y: y2 } = selectedLayer.vertices[selectedLayer.lines[line].vertices[1]];
    x1 = x1 * widthRatio;
    y1 = height - y1 * heightRatio;
    x2 = x2 * widthRatio;
    y2 = height - y2 * heightRatio;
    let length = Geometry.pointsDistance(x1, y1, x2, y2);
    let angle = Geometry.angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2);
    let half_thickness = thickness / 2;
    lineComponent.push(
      <g
      transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)`}
      data-id={line.id}>
        <rect x="0" y={-half_thickness} rx="1" ry="1" width={length} height={thickness} style={STYLE_RECT} />
      </g>
    )
  }
  return lineComponent;
}

const getArea = function (selectedLayer, widthRatio, heightRatio, height) {
  let STYLE_AREA = SharedStyle.MATERIAL_COLORS[500].grey;
  const areaComponent = [];
  for (var area in selectedLayer.areas) {
    let path = '';
    selectedLayer.areas[area].vertices.forEach((vertexID, ind) => {
      let vertex = selectedLayer.vertices[vertexID];
      path += (ind ? 'L' : 'M') + (vertex.x * widthRatio) + ' ' + (height - vertex.y * heightRatio) + ' ';
    });
    areaComponent.push(
      <g
      data-id={area.id}>
        <path d={path} fill={STYLE_AREA} />
      </g>
    );
  }
  return areaComponent;
  //add holes
  // element.holes.forEach(areaID => {
  //   let area = layer.areas.get(areaID);

  //   area.vertices.reverse().forEach((vertexID, ind) => {
  //     let vertex = layer.vertices.get(vertexID);
  //     path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
  //   });

  // });  
}

const getItem = function (selectedLayer, widthRatio, heightRatio, height) {
  const itemComponent = [];
  for (var item in selectedLayer.itmes) {
    // let 
    let renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);
    selectedLayer.items[item];
  }
}

export default function PlanPreview(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [widthRatio, setWidthRatio] = useState(0);
  const [heightRatio, setHeightRatio] = useState(0);

  let plannerState = getPlannerState(props.buildingName);
  let selectedLayer = getLayer(plannerState);

  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
    setWidthRatio(ref.current.clientWidth / plannerState.width);
    setHeightRatio(ref.current.clientHeight / plannerState.height);
  })
  
  return (
    <div ref={ref}>
      <svg>
        {getArea(selectedLayer, widthRatio, heightRatio, height)}
        {getLine(selectedLayer, widthRatio, heightRatio, height)} 
        {getVertex(selectedLayer, widthRatio, heightRatio, height)}
      </svg>
    </div>
  )
}