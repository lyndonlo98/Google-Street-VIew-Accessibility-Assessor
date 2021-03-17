import React, { useState, useEffect } from 'react';
import { useDialog } from 'react-st-modal';

// The element to be shown in the modal window
function AccessibilitySummaryDialog (props) {
    const { lat, long } = props;
    // use this hook to control the dialog
    const dialog = useDialog();
  
    const [value, setValue] = useState();

    const headings = [0, 45, 90, 135, 180, 225, 270, 315, 359]
    const responses = [];

    useEffect(() => {
        headings.forEach(async (elem) => {
            fetch(
                `https://97y4zwfpya.execute-api.us-east-1.amazonaws.com/dev/predict?lat=${lat}&long=${long}&heading=${elem}`,
                {
                  method: "GET",
                //   headers: new Headers({
                //     Accept: "application/vnd.github.cloak-preview"
                //   })
                }
            )
            //.then(res => res.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
        })
        
      }, [lat, long]);
  
    return (
      <div>
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // Сlose the dialog and return the value
            dialog.close(value);
          }}
        >
          Custom button
        </button>
      </div>
    );
}
export default AccessibilitySummaryDialog;