// import { useTheme } from 'styled-components';
// import { ReactComponent as MetaMaskFox } from '../assets/metamask_fox.svg';

/* eslint-disable */
import styles from './FakeButton.module.scss';
import axios from 'axios';
import { PRODUCTIONSNAPSHOT } from '../../../constant/URLs';
const headers = {
  'content-type': 'application/json',
  // Authorization: '<token>',
};
const graphqlQuery = {
  operationName: 'space',
  query: `query {
    space(id: "yam.eth") {
      id
      name
      about
      network
      symbol
      members
    }
  }`,
  variables: {},
};

const FakeButton = () => {
  // const theme = useTheme();

  const trial = async () => {
    const response = await axios({
      url: PRODUCTIONSNAPSHOT,
      method: 'post',
      // headers: headers,
      data: {
        query:
         `query {
          space(id: "0xulas.eth") {
            id
            name
            about
            network
            symbol
            members
          }
        }`,
        // `query {
        //   proposal(id:"0x4a1aedbd9d22295f358dc4028b5a3f0a602bb5f1089dabdc2b63bf2bcce45834") {
        //     id
        //     title
        //     body
        //     choices
        //     start
        //     end
        //     snapshot
        //     state
        //     author
        //     created
        //     scores
        //     scores_by_strategy
        //     scores_total
        //     scores_updated
        //     plugins
        //     network
        //     strategies {
        //       name
        //       network
        //       params
        //     }
        //     space {
        //       id
        //       name
        //     }
        //   }
        // }`
      },
    });
    console.log(response); // data
  };

  return (
    <button className={styles.wrapper} onClick={() => trial()}>
      Hello world
    </button>
  );
};

export { FakeButton };
