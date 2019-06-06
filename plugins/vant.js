import Vue from 'vue';

import VanButton from 'vant/lib/button'
import VanRow from 'vant/lib/row'
import VanProgress from 'vant/lib/progress'
import VanField from 'vant/lib/field'
import VanTab from 'vant/lib/tab';
import VanTabs from 'vant/lib/tabs';
import VanCellGroup from 'vant/lib/cell-group';
import VanCell from 'vant/lib/cell';

import 'vant/lib/index.css';

Vue.use(VanButton)
   .use(VanRow)
   .use(VanProgress)
   .use(VanField)
   .use(VanTab).use(VanTabs)
   .use(VanCellGroup).use(VanCell)
