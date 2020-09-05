import React from "react";

const GlitchFooter = () => {
    return <>
    <footer>
        Made with
        <a href="https://glitch.com">Glitch</a>!
    </footer>

    {/*include the Glitch button to show what the webpage is about and
        to make it easier for folks to view source and remix */}
    <div 
        className="glitchButton"
        style={{
            position:"fixed",
            top: 20,
            right: 20
        }}>
    </div>
    <script src="https://button.glitch.me/button.js"></script>
  </>
}

export default GlitchFooter;