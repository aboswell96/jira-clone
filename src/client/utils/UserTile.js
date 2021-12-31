import React, {useState} from 'react';
import styled from 'styled-components';

const UserTile = (props) => {

    const [isExpanded,setIsExpanded] = useState(false);
    const [value,setValue] = useState(props.user);

    const onClick = (newVal) => {
        setValue(newVal)
        setIsExpanded(false)
    }
    console.log("props " + props.user)
    console.log("value " + JSON.stringify(value))

    return(
        <div>
        <Container
            onClick={()=>setIsExpanded(!isExpanded)}
            style={{'border': '1px solid #dfe1e6'}}
        >
            <UserInfo>
            {value.length > 1 &&
                <UserAvatar
                        img={value[1].photo}
                        height={'24px'}
                        width={'24px'}
                />
            }
            {value.length > 1 && 
                value[1].firstName + " " + value[1].lastName
            }
            </UserInfo>
        </Container>
        <div>
            {isExpanded && value.length > 1 && props.users.map((user,i) => {

                if(value[0] !== user[0]) {
                    return(
                    <Container
                        onClick={() => {onClick(user)}}
                    >
                    <UserInfo>
                        {
                            <UserAvatar
                                    img={user[1].photo}
                                    height={'24px'}
                                    width={'24px'}
                            />
                        }
                        {
                            user[1].firstName + " " + user[1].lastName
                        }
                    </UserInfo> 
                    </Container>
                    );
                }

            })}
        </div>
        </div>
    )
}

export default UserTile;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-start;
    height: inherit;
    margin-left: 30px;
`

const Container = styled.div`
    background-color: rgb(244 245 247);
    height: 32px;
    font-size: 12px;
    font-family: CircularStdBold;
    color: #172B4D;
    width: auto;
    cursor: pointer;

    &:hover {
        background-color: rgb(235, 236, 240);
`

const UserAvatar = styled.div`
    display: block;
    background-image: url(${props => props.img});
    background-position:50% 50%;
    background-repeat:no-repeat;
    background-size: cover;
    background-color: rgb(235, 236, 240);
    height: ${props => props.height};
    width: ${props => props.height};
    border-radius:100%;
`