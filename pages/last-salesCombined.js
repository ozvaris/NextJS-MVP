import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-mvp-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const transformedSales = [];
    console.log(data);
    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    setSales(transformedSales);
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-mvp-default-rtdb.firebaseio.com/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load...</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

// export const getStaticProps = async () => {
//   return fetch("https://nextjs-mvp-default-rtdb.firebaseio.com/sales.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const transformedSales = [];

//       for (const key in data) {
//         transformedSales.push({
//           id: key,
//           username: data[key].username,
//           volume: data[key].volume,
//         });
//       }

//       return { props: { sales: transformedSales }, revalidate: 10 };
//     });
// };

export const getStaticProps = async () => {
  const response = await fetch(
    "https://nextjs-mvp-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
};

export default LastSalesPage;
