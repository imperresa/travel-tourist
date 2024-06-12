import { useState, useEffect } from "react";
import axios from "axios";
export function HomePage() {
  let [search, setSearch] = useState("");
  let [trips, setTrip] = useState([]);

  let homepage = async () => {
    let response = await axios.get(
      `http://localhost:4001/trips?keywords=${search}`
    );
    setTrip(response.data.data);
    console.log(response.data);
  };
  let handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    homepage();
  }, [search]);
  return (
    <>
      <div className="header">
        <h1 className="logo">เที่ยวไหนดี</h1>
      </div>
      <div className="search-box">
        <div>
          <p>ค้นหาที่เที่ยว</p>
        </div>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={search}
          onChange={handleChange}
        />
      </div>
      <div className="trips">
        {trips.map((trip) => {
          return (
            <div key={trip.eid} className="trip-card">
              <div className="trip-photos">
                <img src={trip.photos[0]} />
              </div>
              <div className="content">
                <a href={trip.url} target="_blank"><h2>{trip.title}</h2></a>
                <p>{trip.description.slice(0, 100)}</p>
                <a href={trip.url} target="_blank" >อ่านต่อ</a>
                <p className="trip-tags">หมวด <span>{trip.tags[0]}</span> <span>{trip.tags[1]}</span> <span>{trip.tags[2]}</span> <span>{trip.tags[3]}</span><span>{trip.tags[4]}</span></p>
                <div className="img-box">
                    <img src={trip.photos[1]}/>
                    <img src={trip.photos[2]}/>
                    <img src={trip.photos[3]}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
