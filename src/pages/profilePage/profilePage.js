import React, { useEffect, useState } from "react";
import BlueNav from "../../components/nav/basicNav/blueNav";
import styled from "styled-components";
import getImgUrl from '../../globalLogic';
import ExpBar from "../../components/profile/expBar/expBar";
import { GitLawn } from "git-lawn-hackathon";
import MessageModal from "../../components/profile/mModal/mModal";
import ChallengeState from "../../components/profile/challengebox/challengeList";
import ChallengeContents from "../../components/profile/challengebox/challengeContents";
import profilePageData from "../../data/profilePageData";
import BasicNavTop from "../../components/nav/basicNav/basicNavTop";
import {useParams, Link} from 'react-router-dom';
import axios from "axios";
import { TiHeart } from "react-icons/ti";
import LevelUpModal from "../../components/profile/mModal/levelUpModal";

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y:scroll;
    height: 90vh;
`;

const ExpBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    margin-left: 15%;
`;

const LogoDom = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  margin-left: 20%;
`;

const Logo = styled.img`
  max-width: 90%;
  margin-top : 7%;
`;

const ProfileDom = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
`;

const GardenWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    width: 80%;
`;

const ChallengeListWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10%;
`;

const UserName = styled.span`
    font-family: 'dungeunmo';
    font-weight: 400;
    font-size: 1.4rem;
    margin-bottom: 3%;
    margin-right: 2%;
    margin-left : 1%;
`;

const MbtiName = styled.span`
    font-family: 'dungeunmo';
    font-weight: 400;
    font-size: 0.9rem;
    margin-left: 2%;
    margin-right: 1%;
    width: 100%;
`;

const ChallengeTitleDom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 3%;
`;

const ChallengeBodyDom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top : 2%;
`;

const GrassFooter = styled.img`
  width: 100%;
  bottom: 0;
  position: absolute;
  height: 10%;
  overflow: hidden;
`;

const Profilewrap = styled.div`
    display: flex;
    margin-bottom: 0.7rem;
    width: 90%;

    .Heart{
        margin-left:65%;
        cursor: pointer;
    }
`;

const TierImg = styled.img`
width: 2rem;
`;

const TierDom = styled.span`
    margin-left : 2%;
    margin-right: 1%;
`;

const contentbody = styled.div`
    display: inline-block;
    height: 40%;
    width: 30%;
`;

const NameDom = styled.div`
    display:flex;
    flex-direction : column;
`;

const LevelUpDom = styled.div`
  left: 25%;
  bottom: 55%;
  position: absolute;
  width: 50%;
  height: 9%;
  background-color: #a9d177;
  border-radius: 100px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px dashed #13A74D;
  box-sizing: content-box;
  font-family : 'dungeunmo';
`;

const GITHUB_USERNAME = "leobang17";

// const testData = [
//     {bgcolor: "#7FC087", getexp: 100 },
// ];

const handleTierLawn = (tier) => {
  if(tier === 'bronze'){
    return 'GREEN';
  }
  else if(tier === 'silver'){
    return 'ORANGE';
  }
  else if(tier === 'pink'){
    return 'PINK';
  }
  else if(tier === 'purple'){
    return 'PURPLE';
  }
  else if(tier === 'platinum'){
    return 'BLUE';
  }
}


const ProfilePage = () => {
    const [profileData, setProfileData] = useState([]);
    const [listData, setListData] = useState([]);
    const {id}=useParams();
    const [messageModalOpen, setMessageModalOpen]= useState(false);
    const [levelUp, setLevelUp]=useState(false);

    const handleModal = () => {
        setMessageModalOpen(!messageModalOpen); 
    }

    const fetchData = async ()=>{
        /*
        const data = await axios.get(`http://localhost:8000/api/user/${id}`)
        setProfileData(data.data.profile);
        setListData(data.data.challenges);
        console.log(data.data.profile);
        console.log(data.data.challenges);
        console.log('----------------------------------------------------');
        console.log(listData);
        */
         const data=profilePageData;
         setProfileData(data.profile);
         setListData(data.challenges);
         console.log(profileData);
    }

    useEffect(() => {
        fetchData();
      },[])

      useEffect(() => {
        if(profileData.levelup===true){
            setLevelUp(true);
        }
      }, [profileData])

    return(
        <ProfileWrapper>
            <BasicNavTop />

            <ExpBarWrapper>
                <ProfileDom>
                    {/* <UserName>{profileData.nickname}</UserName> */}
                    <Profilewrap>
                    <NameDom>
                    <MbtiName>{profileData.devType}</MbtiName>
                    <UserName>{profileData.nickname}</UserName>
                    </NameDom>
                    <TierDom>
                    <TierImg src={getImgUrl("flower")}/>
                    </TierDom>
                    <TiHeart color="coral" size={35} className="Heart" onClick={handleModal}/>
                    {messageModalOpen&&<MessageModal setMessageModalOpen={setMessageModalOpen}/>}
                    </Profilewrap>
                        <ExpBar tierType = {profileData.tierType} getexp = {profileData.exp} />
                        
                    {/* <MbtiName>{profileData.devType}</MbtiName> */}
                    
                    
                </ProfileDom>
                
            </ExpBarWrapper>

            <GardenWrapper>
            <LogoDom>
                    <Logo src={getImgUrl("boyLogo")} />
            </LogoDom>
                <GitLawn username = {GITHUB_USERNAME} month={4} grassSpan={20} grassShape={"Circle"} color={handleTierLawn(profileData.tierType)}/>
            </GardenWrapper>

            <ChallengeListWrapper>
                <ChallengeTitleDom>
                    <ChallengeState />
                </ChallengeTitleDom>
                <ChallengeBodyDom>
                    <ChallengeContents listData = {listData}/>
                </ChallengeBodyDom>
            </ChallengeListWrapper>
            <GrassFooter src={getImgUrl("basicgrass")} />
            {
                levelUp ? (
                    <LevelUpDom>
                        <LevelUpModal setLevelUp={setLevelUp}/>
                    </LevelUpDom>
                ):null
            }
        </ProfileWrapper>
        
    );
};

export default ProfilePage;