import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';

configure({ adapter: new Adapter() });

if (global.document) {
  document.createRange = () => ({
    setStart: noop,
    setEnd: noop,
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}
