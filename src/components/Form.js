import React from "react";
import Button from '@material-ui/core/Button';

export default function Form() {
    return (
        <div id="form">
            <h1 >
                <span>Contact</span>
            </h1>
            <div className="form-fields">
                <form name="contact" method="post">
                    <input type="hidden" name="form-name" value="contact" />
                    <p>
                        <input className="input-field" type="text" id="name" name="name" placeholder="Name" required />
                    </p>
                    <p>
                        <input className="input-field" type="email" id="email" name="email" placeholder="Email" required />
                    </p>
                    <p>
                        <textarea id="message" name="message" placeholder="Message" required></textarea>
                    </p>
                    <p>
                        <Button id="submit" type="submit" variant="contained" color="primary">
                            SUBMIT
                        </Button>
                    </p>
                </form>
            </div>

        </div>

    );
}