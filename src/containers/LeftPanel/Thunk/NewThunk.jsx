// component to be rendered in the electron app

// Code copied from Actions.jsx

import React, { useContext } from 'react';
import styles from '../Thunk/Thunk.module.scss';
import styles2 from '../AutoComplete/AutoCompleteMockData.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { deleteAsync, updateAsync, updateActionsFilePath, updateTypesFilePath } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import AutoComplete from '../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';
import ToolTip from '../ToolTip/ToolTip';
import ToolTipMatcher from '../ToolTip/ToolTipMatcher';
import { MockDataContext } from '../../../context/mockDataReducer';
// import LastAssertion from './LastAssertion';
const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');


// const Async = ({ async, index, dispatchToTestCase }) => {
//   return (
//     <Draggable draggableId={async.id.toString()} index={index}>
//       {provided => (
//         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//           {/* <LastAssertion async={async} dispatchToTestCase={dispatchToTestCase} /> */}
//         </div>
//       )}
//     </Draggable>
//   );
// };

const Async = ({ async, index, dispatchToTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  // const [{ mockData }, _] = useContext(MockDataContext);
  const handleChangeAsyncFields = (e, field) => {
    let updatedAsync = { ...async };
    updatedAsync[field] = e.target.value;
    dispatchToTestCase(updateAsync(updatedAsync));
  };

  const handleClickDeleteAsync = e => {
    dispatchToTestCase(deleteAsync(async.id));
  };


  const needsMatcherValue = matcherType => {
    const matchersWithValues = [
      'toEqual', //takes in an object Ex: {type: action.ADD_TASK, payload: user defined text }
      'not.toEqual', //takes in an object Ex: {type: action.ADD_TASK, payload: user defined text }
    ];
    return matchersWithValues.includes(matcherType);
  };

  const handleChangeActionsFileName = e => {
    const actionsFileName = e.target.value;
    const filePath = filePathMap[actionsFileName] || '';
    dispatchToTestCase(updateActionsFilePath(actionsFileName, filePath));
  };

  const handleChangeTypesFileName = e => {
    const typesFileName = e.target.value;
    const filePath = filePathMap[typesFileName] || '';
    dispatchToTestCase(updateTypesFilePath(typesFileName, filePath));
  };

  return (
    <Draggable draggableId={async.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.actionCreator}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteAsync} />

          <div id={styles.actionCreatorHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Async</h3>
          </div>

          <div id={styles.filesFlexBox}>
            <div id={styles.files}>
              <label htmlFor='actionsFile'>Actions File Name</label>
              <input
                type='text'
                id={styles.renderInputBox}
                value={async.actionsFile}
                onChange={handleChangeActionsFileName}
              />
            </div>

            <div id={styles.files}>
              <label htmlFor='typesFile'>Types File Name</label>
              <input
                type='text'
                id={styles.renderInputBox}
                value={async.typesFile}
                onChange={handleChangeTypesFileName}
              />
            </div>
          </div>

          <div id={styles.filesFlexBox}>
            <div id={styles.files}>
              <label htmlFor='asyncFunction' className={styles.queryLabel}>
                Async Function
                </label>
              <input
                type="text"
                name="asyncFunction"
                onChange={e => handleChangeAsyncFields(e, 'asyncFunction')} />
            </div>

            <div id={styles.queryFlexBox}>
              <div id={styles.querySelector}>
                <label htmlFor='method' className={styles.queryLabel}>
                  Method
              </label>
                <div id={styles.dropdownFlex}>
                  <select
                    id='method'
                    value={async.method}
                    onChange={e => handleChangeAsyncFields(e, 'method')}
                  >
                    <option value='' />
                    <option value='get'>get</option>
                    <option value='post'>post</option>
                    <option value='put'>put</option>
                    <option value='delete'>delete</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div id={styles.filesFlexBox}>
            <div id={styles.files}>
              <label htmlFor='route' className={styles.queryLabel}>
                Route
                </label>
              <input
                type="text"
                name="route"
                onChange={e => handleChangeAsyncFields(e, 'route')}
              />
            </div>


            <div id={styles.files}>
              <label htmlFor='store' className={styles.queryLabel}>
                Store
                </label>
              <input
                type="text"
                name="store"
                onChange={e => handleChangeAsyncFields(e, 'store')} />
            </div>
          </div>

          <div id={styles.queryFlexBox}>
            <div id={styles.querySelector}>
              <label htmlFor='matcher' className={styles.queryLabel}>
                Matcher
              </label>
              <div id={styles.dropdownFlex}>
                <select
                  id='matcher'
                  value={async.matcher}
                  onChange={e => handleChangeAsyncFields(e, 'matcher')}
                >
                  <option value='' />
                  <option value='toEqual'>toEqual</option>
                  <option value='toContainEqual'>toContainEqual</option>
                </select>
              </div>
            </div>

            <div id={styles.files}>
              <label htmlFor='expectedResponse' className={styles.queryLabel}>
                Expected Response
                </label>
              <input
                type="text"
                name="expectedResponse"
                onChange={e => handleChangeAsyncFields(e, 'expectedResponse')}
              />
            </div>
          </div>
        </div>

      )
      }
    </Draggable >
  );
};

export default Async;
