
/* global L:true */
/* eslint no-underscore-dangle: 0 */

'use strict';

L.MarkerClusterGroup.WithList = L.MarkerClusterGroup.extend({
  options: {
    list: true
  },

  initialize(options) {
    console.log('init');
    L.MarkerClusterGroup.prototype.initialize.call(this, options);
  },

  onAdd(map) {
    console.log('on add');
    this.list = L.markerClusterGroup.list({});
    this.list.addTo(map);

    L.MarkerClusterGroup.prototype.onAdd.call(this, map);
  },

  refreshList(children) {
    this.list.refreshContent(children);
  }
});

L.MarkerCluster.include({
  spiderfy() {
    const childMarkers = this.getAllChildMarkers();
    const group = this._group;
    group.refreshList(childMarkers);
  }
});

L.markerClusterGroup.withList = function (options) {
  return new L.MarkerClusterGroup.WithList(options);
};

L.MarkerCluster.List = L.Control.extend({
  options: {
    position: 'topright'
  },

  onAdd(map) {
    const container = L.DomUtil.create('div', 'markercluster-list leaflet-bar');

    const row = L.DomUtil.create('p', 'marker-cluster-list-row', container);
    row.innerHTML = 'ahoj';

    setTimeout(() => {
      this.moveContainer(map);
    }, 100);

    return container;
  },

  moveContainer(map) {
    const mapDom = map.getContainer();
    const controlDom = this.getContainer();
    mapDom.appendChild(controlDom);
  },

  refreshContent(elements) {
    const rows = elements.map((element, ei) => `<tr><td>${ei}</td></tr>`);
    const html = `<table><tbody>${rows.join('')}</tbody></table>`;
    this.getContainer().innerHTML = html;
  }

});

L.markerClusterGroup.list = function (options) {
  return new L.MarkerCluster.List(options);
};
