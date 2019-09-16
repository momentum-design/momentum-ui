import Alert from './lib/alert/index.vue';
import AlertBanner from './lib/alert-banner/index.vue';
import AlertContainer from './lib/alert-container/index.vue';
import AriaModal from './lib/aria-modal/index.vue';
import Badge from './lib/badge/index.vue';
import Button from './lib/button/index.vue';
import ButtonGroup from './lib/button-group/index.vue';
import Breadcrumbs from './lib/breadcrumbs/index.vue';
import Checkbox from './lib/checkbox/index.vue';
import CheckboxGroup from './lib/checkbox-group/index.vue';
import CloseIcon from './lib/close-icon/index.vue';
import EventOverlay from './lib/event-overlay/index.vue';
import FocusTrap from './lib/focus-trap/index.vue';
import Icon from './lib/icon/index.vue';
import Label from './lib/label/index.vue';
import List from './lib/list/index.vue';
import ListItem from './lib/list-item/index.vue';
import ListItemHeader from './lib/list-item-header/index.vue';
import ListItemSection from './lib/list-item-section/index.vue';
import ListSeparator from './lib/list-separator/index.vue';
import Loading from './lib/loading/index.vue';
import Modal from './lib/modal/index.vue';
import ModalBody from './lib/modal-body/index.vue';
import ModalFooter from './lib/modal-footer/index.vue';
import ModalHeader from './lib/modal-header/index.vue';
import Popover from './lib/popover/index.vue';
import Radio from './lib/radio/index.vue';
import RadioGroup from './lib/radio-group/index.vue';

const components = [
  Alert,
  AlertBanner,
  AlertContainer,
  AriaModal,
  Badge,
  Button,
  ButtonGroup,
  Breadcrumbs,
  Checkbox,
  CheckboxGroup,
  CloseIcon,
  EventOverlay,
  FocusTrap,
  Icon,
  Label,
  List,
  ListItem,
  ListItemHeader,
  ListItemSection,
  ListSeparator,
  Loading,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Popover,
  Radio,
  RadioGroup
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Alert,
  AlertBanner,
  AlertContainer,
  AriaModal,
  Badge,
  Button,
  ButtonGroup,
  Breadcrumbs,
  Checkbox,
  CheckboxGroup,
  CloseIcon,
  EventOverlay,
  FocusTrap,
  Icon,
  Label,
  List,
  ListItem,
  ListItemHeader,
  ListItemSection,
  ListSeparator,
  Loading,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Popover,
  Radio,
  RadioGroup
};
