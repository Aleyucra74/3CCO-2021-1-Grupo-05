import React, {useState} from 'react';
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


const ScrollButton = () =>{
  
    const [visible, setVisible] = useState(false)
    
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300){
        setVisible(true)
      } 
      else if (scrolled <= 300){
        setVisible(false)
      }
    };

    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };
      
      window.addEventListener('scroll', toggleVisible);
      
      return (
        <div className="button-top" style={{display: visible ? 'inline' : 'none', 
                    float: 'right',
                    marginTop: "33%",
                    marginLeft: "2%",
                    position: "fixed"}}>
        <Button icon onClick={scrollToTop} size="huge" color="standard">
            <Icon name='angle up' />
        </Button>
        </div>
      );
    }
      
    export default ScrollButton;