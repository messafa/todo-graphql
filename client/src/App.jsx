import { useQuery, gql } from '@apollo/client';


function App() {

  const { loading, error, data } = useQuery(gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <>Error :
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </>;

  console.log(data);

  return (
    <>
      <h1>Locations</h1>
      <ul>
        {data.locations.map(location => (
          <li key={location.id}>
            <h2>{location.name}</h2>
            <p>{location.description}</p>
            <img src={location.photo} alt={location.name} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
