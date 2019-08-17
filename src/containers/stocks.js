import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import stocksActions from '../redux/stocksActions';

const loadStocksRequest = stocksActions.loadStocksRequest;

const Stocks = () => {
  const stocks = useSelector(state => state.stocks.allStocks);
  const useFetching = (someFetchActionCreator, dispatch) => {
    useEffect(() => {
      dispatch(someFetchActionCreator());
    })
  }
  useFetching(loadStocksRequest, useDispatch());
  const error = useSelector(state => state.stocks.error)
  if (error) {
    return <h1>We have an error: {error}</h1>
  } else if (stocks && stocks.length) {
    return (<div>
      {
        stocks.map((stock) =>
          <ol key={stock.id}>
            {Object.keys(stock).map((item, index) =>
              <li key={index}>
                <span>{item}: </span>
                <span>{stock[item]}</span>
              </li>
            )}
            <br />
          </ol>
        )
      }
    </div >)
  } else {
    return (<div>Loading...</div>)
  }
}

export default Stocks

// class Stocks extends Component {
//   componentDidMount() {
//     this.props.loadStocksRequest();
//   }

//   render() {
//     if (this.props.stocks || this.props.stocks.length) {
//       return (
//         <div>
//           <p>We have {this.props.stocks.length} stocks.</p>
//           {this.props.stocks.map((stock) =>
//             <ol key={stock.id}>
//               {Object.keys(stock).map((item, index) =>
//                 <li key={index}>
//                   <span>{item}: </span>
//                   <span>{stock[item]}</span>
//                 </li>
//               )}
//               <br />
//             </ol>
//           )}
//         </div>
//       )
//     }
//     return <p>Loading...</p>
//   }
// }
// export default connect(
//   state => ({
//     stocks: state.stocks.allStocks || [],
//     error: state.stocks.error || null,
//   }),
//   { loadStocksRequest }
// )(Stocks);
