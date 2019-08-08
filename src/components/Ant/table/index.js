import GcTable from './src/table';

GcTable.install = function(Vue) {
  Vue.component(GcTable.name, GcTable);
};

export default GcTable;