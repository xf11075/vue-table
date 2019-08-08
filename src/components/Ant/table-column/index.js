import GCTableColumn from '../table/src/table-column';

GCTableColumn.install = function(Vue) {
  Vue.component(GCTableColumn.name, GCTableColumn);
};

export default GCTableColumn;