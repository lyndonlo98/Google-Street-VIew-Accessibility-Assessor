import React, { useState, useEffect } from 'react';
import { useDialog } from 'react-st-modal';
import { css } from "@emotion/core";
import { ClockLoader } from "react-spinners";

// The element to be shown in the modal window
function AccessibilitySummaryDialog(props) {
  const { lat, lng } = props;
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#b0f69e");
  const [error, setError] = useState("");

  const headings = [0, 45, 90, 135, 180, 225, 270, 315]
  const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

  useEffect(() => {
    let requests = headings.map(elem => (
      fetch(
        `https://97y4zwfpya.execute-api.us-east-1.amazonaws.com/dev/predict?lat=${lat}&long=${lng}&heading=${elem}`,
        {
          method: "GET",
        }
      )
    ));
    Promise.all(requests)
      .then(responses => {
        return Promise.all(responses.map(res => res.blob()));
      })
      .then(blobs => {
        return Promise.all(blobs.map(blob => URL.createObjectURL(blob)));
      })
      .then(urls => {
        setLoading(false);
        setResponses(urls);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      });
  }, [lat, lng]);

  return (
    <div id="dialog">
      {(loading && !error) && (
        <ClockLoader color={color} loading={loading} css={override} size={120} />
      )}
      {error && (
        <div className="error-box">
          <h2>Looks like our hamster (lambda function) is sleeping right now 😴</h2>
          <h2>Try one or two more times and the hamster should be running!</h2>
        </div>
      )}
      {responses && responses.map((img, index) => (
        <img key={index} src={img} />
      ))}
    </div>
  );
}
export default AccessibilitySummaryDialog;