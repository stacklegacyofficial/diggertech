import React from 'react';
import './App.css';
import FlipPage from 'react-flip-page'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import "./style.css";
import axios from 'axios';
import Image from 'react-shimmer'
import ReactSnackBar from "react-js-snackbar";
// https://codesandbox.io/s/qq7759m3lq?module=%2Fsrc%2FCarousel.js

const footerStyle = {
  backgroundColor: "purple",
  fontSize: "20px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "70px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

const { height, width } = getWindowDimensions();
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
export default class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
    posts: [], last_id: "", loader: false, show: false
  }
  this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  }

componentDidMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if(ele){
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
      }, 10000)
    }

    axios.get(`https://stacklegacy.com/diggertech/load_posts`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
        this.setState({loader: true, show: true});
        this.setState({last_id: posts[posts.length-1].id});
        // debugger;
      })

      setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }


handleChange(event) {
  // ${this.state.id}
  axios.get(`https://stacklegacy.com/diggertech/onchange/?id=${this.state.last_id}`)
  .then(res => {
    const posts = res.data;
    this.setState({last_id: posts.id});
    // this.state.posts.shift();
    this.state.posts.push(posts);
    // debugger;

  })

}


// width={flipPageWidth}


render() {
  console.log(this.state.posts)


  return (
    <div>
       <div className="page-content">  
        <div className="news-container">
       <div className="news-feed" id="content">
      
      <FlipPage
        className="page"
        showSwipeHint={this.state.loader}
        uncutPages
        loopForever="true"
        showHint={this.state.loader}
        onPageChange={() => this.handleChange(27)}
        orientation="horizontal"
        animationDuration="400"
        width={width+2}
        pageBackground="#fffff"       
        height={height}
      >

      {(this.state.posts && this.state.loader) === false ?
            <div className="card" style={{ "height": height, "width":width}}>
            <div className="shimmerBG media"></div>
            <div className="p-32">
              <div className="shimmerBG title-line"></div>
              <div className="shimmerBG title-line end"></div>
              <div className="shimmerBG content-line m-t-24"></div>
              <div className="shimmerBG content-line"></div>
              <div className="shimmerBG content-line"></div>
              <div className="shimmerBG content-line"></div>
              <div className="shimmerBG content-line"></div>
              <div className="shimmerBG content-line"></div>
              <div className="shimmerBG content-line"></div><br/>
              <div className="shimmerBG content-line"></div>
              <div className="shimmerBG content-line"></div>
              <div className="shimmerBG content-line end"></div>
            </div>
          </div>
       : 

        this.state.posts.map(page => (
         
          <div className="tinder--card" style={{"height": height - 70}} key={page.id}>
            <img src={page.image} width={width} height={307} style={{ objectFit: 'cover'}} />
            <h3>{page.title}</h3>
            <p>{page.description} {page.description.length <= 150 ? '' : '' }</p>
            <div className="xyz">                
            <span id="likes_45">Posted By </span> <b> {page.author_name} </b> On {page.created_at} <br />Read more at
              <a target="_blank" href="{page.url}"> {page.publisher_name} </a><p></p><br/>
          
            </div>
        </div>
        ))}
      </FlipPage>
         <ReactSnackBar Icon={<span>📰</span>} Show={this.state.show}>
          Loaded, {this.state.posts.length + 90}+ feed, Keep reading!
        </ReactSnackBar>
      <div>
      <div style={phantomStyle} />
      <div style={footerStyle}></div>
    </div>
      </div>
      </div>
</div>
  </div>
);
}
}