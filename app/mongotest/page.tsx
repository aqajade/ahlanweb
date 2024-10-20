export default async function Page() {
  const fetchContohs = async () => {
    // const res = await fetch("/api/contohs"); ini gaberes:
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contohs`);
    console.log("Response:", res); // Log the response

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const contohs = await res.json();
    return contohs;
  };

  let contohs;
  try {
    contohs = await fetchContohs();
  } catch (error) {
    console.error("Failed to fetch contohs:", error);
    return <div>Error fetching data</div>; // Handle error gracefully
  }

  return (
    <div>
      <h1>Contohs</h1>
      {contohs.length === 0 ? (
        <p>No data available</p>
      ) : (
        contohs.map((contoh: any) => (
          <div key={contoh._id}>
            <h2>{contoh.name}</h2>
            <p>{contoh.description}</p>
            <p>{contoh.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

// export default async function Page() {
//   const fetchContohs = async () => {
//     const res = await fetch("/api/contohs");

//     if (!res.ok) {
//       throw new Error(`Error: ${res.status} ${res.statusText}`);
//     }

//     const contohs = await res.json();
//     return contohs;
//   };

//   let contohs;
//   try {
//     contohs = await fetchContohs();
//   } catch (error) {
//     console.error("Failed to fetch contohs:", error);
//     return <div>Error fetching data</div>; // Handle error gracefully
//   }

//   return (
//     <div>
//       <h1>Contohs</h1>
//       {contohs.map((contoh: any) => (
//         <div key={contoh._id}>
//           <h2>{contoh.name}</h2>
//           <p>{contoh.description}</p>
//           <p>{contoh.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default async function page() {
//   const fetchContohs = async () => {
//     const res = await fetch("/api/contohs"); //nnt cb tanya
//     const contohs = await res.json();
//     return contohs;
//   };

//   const contohs = await fetchContohs();

//   return (
//     <div>
//       <h1>Contohs</h1>
//       {contohs.map((contoh: any) => (
//         <div key={contoh._id}>
//           <h2>{contoh.name}</h2>
//           <p>{contoh.description}</p>
//           <p>{contoh.price}</p>
//         </div> //nnt cb tanya
//       ))}
//     </div>
//   );
// }
