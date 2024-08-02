import { Box } from "@mui/system";
import { AstrologerComponent, ScreenContainer } from "components";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
const AstrologerListing = () => {
    const astrolist = useSelector(state => state.astrolist)?.list
    const onlineUsers=useSelector(state=>state.onlineusers)?.list
    const [onlines,setOnlines]=React.useState([])
    const [astroloSort,setAstroSort]=React.useState([])
    React.useEffect(() => {
        let ou=onlineUsers.filter(x=>(moment().unix()-x.lastOnline)<30).map(x=>x?._id)
        setOnlines(ou)
        let ons=astrolist?.filter(x=>ou.includes(x._id))
        let offs=astrolist?.filter(x=>!ou.includes(x._id))
        setAstroSort(ons.concat(offs))
    }, [onlineUsers,astrolist])
    
    return (
        <ScreenContainer>
            <Box sx={{ flexDirection: { laptop: 'row', mobile: 'column' }, width: '80%', alignSelf: 'center', marginX: 'auto', display: 'flex', flexWrap: { laptop: 'wrap', mobile: 'column' }, height: '100%', justifyContent: 'space-between' }}>
                {
                    astroloSort.map((astro) => {
                        return (
                            <AstrologerComponent astro={astro} />
                        )
                    })
                }
            </Box>
        </ScreenContainer>
    )
}
export default AstrologerListing;