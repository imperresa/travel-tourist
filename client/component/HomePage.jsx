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
  let handlerClick = (e) => {
    let text = search ? `${search} ${e}` : e;
    setSearch(text);
  };
  useEffect(() => {
    homepage(search);
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
              <div className="trip-photos"><img className="img" src={trip.photos[0]}></img></div>
              <div className="content">
                <a href={trip.url} target="_blank">
                  <h2>{trip.title}</h2>
                </a>
                <p>{trip.description.slice(0, 100)}</p>
                <a href={trip.url} target="_blank">
                  อ่านต่อ
                </a>
                <p className="trip-tags">
                  หมวด
                  {trip.tags.map((tag, i) => {
                    return trip.tags.length - 1 !== i ? (
                      <span key={i} onClick={() => handlerClick(tag)}>
                        {tag}
                      </span>
                    ) : null;
                  })}
                  และ
                  {trip.tags.map((tag, i) => {
                    return trip.tags.length - 1 === i ? (
                      <span key={i} onClick={() => handlerClick(tag)}>
                        {tag}
                      </span>
                    ) : null;
                  })}
                </p>
                <div className="img-box">
                  {trip.photos.map((photo, i) => {
                    return i > 0 ? <img src={photo} /> : null;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
