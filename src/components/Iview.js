import Menu from 'iview/src/components/menu';
import Icon from 'iview/src/components/icon';
import Card from 'iview/src/components/card';
import { Row, Col } from 'iview/src/components/grid';
import Table from 'iview/src/components/table';
import Spin from 'iview/src/components/spin';
import DatePicker from 'iview/src/components/date-picker';

const Iview = {
	install: function(Vue){
		Vue.component('iMenu',Menu);
		Vue.component('Menu-item',Menu.Item);
		Vue.component('Menu-group',Menu.Group);
		Vue.component('Submenu',Menu.Sub);
	  	Vue.component('Icon',Icon);
	  	Vue.component('Card',Card);
	  	Vue.component('Row',Row);
	  	Vue.component('iCol',Col);
	  	Vue.component('iTable',Table);
	  	Vue.component('Spin',Spin);
	  	Vue.component('date-picker',DatePicker);
	}

}

export default Iview
