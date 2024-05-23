import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-3">
          <p className="">
            {" "}
            Contact
            <span className="font-semibold"> {landlord.username}</span> for{" "}
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>
          <textarea
            className="w-full border p-3 rounded-lg "
            name="message"
            id="message"
            rows="2"
            value={msg}
            onChange={handleChange}
            placeholder="enter your message"
          ></textarea>
          <Link
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-80"
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name} &body=${msg}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
