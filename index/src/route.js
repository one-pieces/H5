import H5Collection from './pages/H5Collection.vue';
import H5Detail from './pages/H5Detail.vue';

export default {
  '': {
    name: 'h5',
    component: H5Collection
  },
  'h5/:id': {
    name: 'h5Detail',
    component: H5Detail
  }
};
