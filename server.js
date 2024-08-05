
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const User = require('./models/userModel'); // Ensure correct path
// const EmployeeModel = require('./models/employeeModel');

// Serve static files from the 'public' directory


const seedRouter = require('./routes/seedRoutes');
const productRouter = require('./routes/productRoutes');
const notedirRouter = require('./routes/notedirRouter');
const notebookRouter = require('./routes/notebookRouter');
const userRouter = require('./routes/userRoutes');
const feedbackRouter = require('./routes/feedbackRouter');
const tshirtRouter = require('./routes/tshirtsRoutes');
const frostedMugRouter = require('./routes/frostedMugsRoutes');
const awardRouter = require('./routes/awardRoutes')
const badgeRouter = require('./routes/badgeRoutes');
const bagRouter = require('./routes/bagRoutes');
const mugRouter = require('./routes/mugRoutes');
const couplemugRouter = require('./routes/couplemugRoutes')
const hotcoldsipperRouter = require('./routes/hotcoldsipperRouter')
const diaryRouter = require('./routes/diaryRoutes')
const orderRouter = require('./routes/orderRoutes')
const travelmugRouter = require('./routes/travelmugRoutes')
const mgnameplateRouter = require('./routes/mgnameplateRouter')
const mousepadRouter = require('./routes/mousepadRoutes')
const mobileholdRouter = require('./routes/mobileholdRoutes')
const clothingRouter = require('./routes/clothingRoutes')
const pendriveRouter = require('./routes/pendriveRoutes')
const bearmugRouter = require('./routes/bearmugRouter')
const magicmugRouter = require('./routes/magicmugRouter')
const stationeriesRouter = require('./routes/stationerieRoutes')
const shotglassesRouter = require('./routes/shotglassesRoutes')
const giftsetRouter = require('./routes/giftsetRouter')
const singlwallsipperRouter = require('./routes/single_wall_sipperRoutes')
const plasticsipperRouter= require('./routes/plasticsipperRouter')
const copperbottleRouter= require('./routes/copperbottleRouter')
const antiskitbottleRouter= require('./routes/antiskitbottleRouter')
const borosilicategalssbottleRouter = require('./routes/borosilicateglasssbottleRouter');
const bomboobottleRouter= require('./routes/bomboobottleRouter')
const shakerbottleRouter= require('./routes/shakerbottleRouter')
const roundmgbadgeRouter= require('./routes/roundmgbadRouter')
const pocmagbadgeRouter= require('./routes/pocmgbadRouter')
const metnamebadgeRouter= require('./routes/metalnamebdgRouter')
const roundpinbadgeRouter= require('./routes/roundpinbdgRouter')
const acrynamebadgeRouter= require('./routes/acrynamebdgRouter')
const clipplabadgeRouter= require('./routes/clipplastbagRouter')
const dommagbadgeRouter= require('./routes/dommgbdgRouter')
const ovlmgbadgeRouter= require('./routes/ovlmgbdgRouter')
const laptopslvRouter= require('./routes/laptopslvRouter')
const pinnmplateRouter= require('./routes/pinnmplateRouter')
const domnmplateRouter= require('./routes/domnmplateRouter')
const metlnmplateRouter= require('./routes/metnmplateRouter')
const acrynmplateRouter= require('./routes/acrynmplateRouter')
const tablelampRouter= require('./routes/tablelampsRouter')
const digitalclockRouter= require('./routes/digital_clockRouter')
const power_bankRouter= require('./routes/power_bankRouter')
const digitalphframesRouter= require('./routes/digital_ph_frame_Router')
const photoframeRouter= require('./routes/photo_FrameRouter')
const keychainRouter= require('./routes/KeychainRouter')
const lunch_boxRouter= require('./routes/lunch_boxRouter')
const kettelRouter= require('./routes/kettelRouter')
const card_holderRouter= require('./routes/card_holderRouter')
const best_sellerRouter= require('./routes/best_sellerRouter')
const fridgeMagnetsRouter= require('./routes/fridgeMagnetRouter')
const paper_mugRouter= require('./routes/paper_mugRouter')
const coasterRouter= require('./routes/CoasterRouter')
const bandRouter= require('./routes/bandRouter')
const bamboomugRouter= require('./routes/bamboomugRouter')
const brochureRouter= require('./routes/brochureRouter')
const stadeeRouter= require('./routes/standeeRouter')
const occasionRouter= require('./routes/occasionRoutes')
const printingRouter= require('./routes/printingRoutes')
const teach_accRouter= require('./routes/teach_accRoutes')
const sublimation_itemRouter= require('./routes/sublimationRouter')
const containerRouter= require('./routes/conatinerRouter')
const desk_standRouter= require('./routes/desk_standRouter')
const jutebagRouter= require('./routes/jutebagRouter')
const totebagRouter= require('./routes/totebagRouter')
const bagpackRouter= require('./routes/bagpackRouter')
const cardpendriveRouter= require('./routes/card_pendriveRouter')
const calenderRouter= require('./routes/calenderRouter')
const flyer_pamplateRouter= require('./routes/flyer_pamplateRouter')
const bookmarkRouter= require('./routes/bookmarkRouter')
const folderRouter= require('./routes/folderRouter')
const magzineRouter= require('./routes/magzineRouter')
const training_mannualRouter= require('./routes/training_mannualRouter')
const annual_ReportRouter= require('./routes/annual_reportRouter')
const document_printingRouter= require('./routes/document_printingRoutes')
const project_reportRouter= require('./routes/project_reportRoutes')
const stickerRouter= require('./routes/stickersRoutes')
const notepadRouter= require('./routes/notepadRouter')
const sipperRouter= require('./routes/sipperRouter')
const family_tshirtRouter= require('./routes/family_tshirtRouter')
const fullsleave_tshirtRouter= require('./routes/fullsleave_tshirtRouter')
const girls_tshirtRouter= require('./routes/girls_tshirtRouter')
const couple_tshirtRouter= require('./routes/couple_tshirtRouter')
const sports_tshirtRouter= require('./routes/sport_tshirtRouter')
const polo_tshirtRouter= require('./routes/polo_tshirtRouter')
const dry_fit_tshirtRouter= require('./routes/dry_fit_tshirtRouter')
const hoodieRouter= require('./routes/hoodieRouter')
const capRouter= require('./routes/capRouter')
const walletRouter= require('./routes/walletRouter')
const certificateRouter= require('./routes/certificateRouter')
const cushion_coverRouter= require('./routes/cushionCoverRouter')
const magnetic_photoframeRouter= require('./routes/meg_photo_frameRouter')
const acrylic_photoprintsRouter= require('./routes/Acrylic_photo_frameRouter')
const id_landyardRouter= require('./routes/id_landyardRouter')
const pencilRouter= require('./routes/pencilRouter')
const checkbook_coverRouter= require('./routes/checkbook_coverRouter')
const clutcheRouter= require('./routes/clutchesRouter')
const slingbagRouter= require('./routes/slingbagRouter')
const travelbagRouter= require('./routes/travelbagRouter')
const schoolbagRouter= require('./routes/schoolbagRouter')
const non_wovenbagRouter= require('./routes/non_wovenbagRouter')
const wildcraftbagRouter= require('./routes/wildcraftbagRouter')
const headphoneRouter= require('./routes/headphoneRouter')
const laptop_skinRouter= require('./routes/laptop_skin_Router')
const mobile_accessorieRouter= require('./routes/mobileAccesRouter')
const magnifireRouter= require('./routes/magnifireRouter')
const cushionRouter= require('./routes/cushionRouter')
const bag_walletRouter= require('./routes/bag_walletRouter')
const bottle_sipperRouter= require('./routes/bottle_sipperRouter')
const giftcardRouter= require('./routes/giftcardRouter')
const posterRouter= require('./routes/posterRouter')
const stampRouter= require('./routes/stampRouter')
const tagRouter= require('./routes/tagRouter')
const pramotionalproRouter= require('./routes/pramotionalProRouter')
const sustainalitemRouter= require('./routes/sustainablesitemRouter')
const speakerRouter= require('./routes/speakerRouter')
const penRouter= require('./routes/penRouter')
const mousekeyRouter= require('./routes/mouse_keyRouter')
const rubikcubRouter= require('./routes/rubikcubeRouter')
const glasstumblerRouter= require('./routes/glasstumbRuter')
const desktopitemRouter= require('./routes/dersktop_itemRouter')



// const resetPasswordRouter = require('./routes/resetPassword_Router'); // Correct path to your router


dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://finemulti2018:finemulti@finemultiprint.qfvqnpv.mongodb.net//fmprojectdata';

mongoose.connect(MONGODB_URL).then(() =>{
        console.log('Connected to db')
       
    })
    .catch((err) =>{
        console.log(err.message);
    });
    

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors()); 
app.use('/api/seed', seedRouter);   
app.use('/api/products', productRouter);
app.use('/api/notedirs', notedirRouter);
app.use('/api/notebooks', notebookRouter);
app.use('/api/users', userRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/router', feedbackRouter);

// app.use('/api', resetPasswordRouter); // Ensure correct endpointreset password, if needed
app.use('/api/orders', orderRouter);


// Tshirts
app.use('/api/tshirts', tshirtRouter);

//Frosted Mug
app.use('/api/frostedMugs', frostedMugRouter);

//Awards
app.use('/api/awards', awardRouter);

//Badges
app.use('/api/badges', badgeRouter);

//Bag
app.use('/api/bags', bagRouter);

//Mug
app.use('/api/mugs', mugRouter);


//Couplemug
app.use('/api/couplemugs', couplemugRouter);

//Hotcoldsippers
app.use('/api/hotcoldsippers', hotcoldsipperRouter);

//Diary
app.use('/api/diaries', diaryRouter);

//Travel mug
app.use('/api/travelmugs', travelmugRouter);

// Mgnameplate
app.use('/api/mgnameplates', mgnameplateRouter);

// Mousepad
app.use('/api/mousepads', mousepadRouter);

// mobileholds
app.use('/api/mobileholds', mobileholdRouter);

// Clothing
app.use('/api/clothings', clothingRouter);

// Pendrive
app.use('/api/pendrives', pendriveRouter);

// Bearmug
app.use('/api/bearmugs', bearmugRouter);

// Magicmug
app.use('/api/magicmugs', magicmugRouter);

// stationeries
app.use('/api/stationeries', stationeriesRouter);

// stationeries
app.use('/api/shotglasses', shotglassesRouter);

// Giftsets
app.use('/api/giftsets', giftsetRouter);


app.use('/api/singlwallsippers', singlwallsipperRouter);
app.use('/api/plasticsippers', plasticsipperRouter);
app.use('/api/mouse_keyboards', mousekeyRouter);

app.use('/api/copperbottles', copperbottleRouter);
app.use('/api/antiskitbottles', antiskitbottleRouter);
app.use('/api/borosilicategalssbottles', borosilicategalssbottleRouter);
app.use('/api/bomboobottles', bomboobottleRouter);
app.use('/api/shakerbottles', shakerbottleRouter);
app.use('/api/roundmgbadges', roundmgbadgeRouter);
app.use('/api/pocmagbadges', pocmagbadgeRouter);
app.use('/api/metnamebadges', metnamebadgeRouter);
app.use('/api/roundpinbadges', roundpinbadgeRouter);
app.use('/api/acrynamebadges', acrynamebadgeRouter);
app.use('/api/clipplabadges', clipplabadgeRouter);
app.use('/api/dommagbadges', dommagbadgeRouter);
app.use('/api/ovlmgbadges', ovlmgbadgeRouter);
app.use('/api/laptopsleeves', laptopslvRouter);
app.use('/api/pinnmplates', pinnmplateRouter);
app.use('/api/domnmplates', domnmplateRouter);
app.use('/api/metlnmplates', metlnmplateRouter);
app.use('/api/acrnmplates', acrynmplateRouter);
app.use('/api/tablelamps', tablelampRouter);
app.use('/api/power_banks', power_bankRouter);
app.use('/api/digitalclocks', digitalclockRouter);
app.use('/api/digitalphframes', digitalphframesRouter);
app.use('/api/photoframes', photoframeRouter);
app.use('/api/keychains', keychainRouter);
app.use('/api/lunchBoxes', lunch_boxRouter);
app.use('/api/kettles', kettelRouter);
app.use('/api/card_holders', card_holderRouter);
app.use('/api/best_sellers', best_sellerRouter);
app.use('/api/fridgeMagnets', fridgeMagnetsRouter);
app.use('/api/paper_mugs', paper_mugRouter);
app.use('/api/coasters', coasterRouter);
app.use('/api/bands', bandRouter);
app.use('/api/bomboomugs', bamboomugRouter);
app.use('/api/brochures', brochureRouter);
app.use('/api/standees', stadeeRouter);
app.use('/api/occasions', occasionRouter);
app.use('/api/printings', printingRouter);
app.use('/api/teachaccesories', teach_accRouter);
app.use('/api/sublimation_items', sublimation_itemRouter);
app.use('/api/containers', containerRouter);
app.use('/api/desk_stands', desk_standRouter);
app.use('/api/totebags', totebagRouter);
app.use('/api/jutebags', jutebagRouter);
app.use('/api/bagpacks', bagpackRouter);
app.use('/api/cardpendrives', cardpendriveRouter);
app.use('/api/calenders', calenderRouter);
app.use('/api/flyer_pamplates', flyer_pamplateRouter);
app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/folders', folderRouter);
app.use('/api/magzines', magzineRouter);
app.use('/api/training_mannuals', training_mannualRouter);
app.use('/api/annual_Reports', annual_ReportRouter);
app.use('/api/document_printings', document_printingRouter);
app.use('/api/project_reports', project_reportRouter);
app.use('/api/stickers', stickerRouter);
app.use('/api/notepads', notepadRouter);
app.use('/api/sippers', sipperRouter);
app.use('/api/family_tshirts', family_tshirtRouter);
app.use('/api/fullsleave_tshirts', fullsleave_tshirtRouter);
app.use('/api/girls_tshirts', girls_tshirtRouter);
app.use('/api/couple_tshirts', couple_tshirtRouter);
app.use('/api/sports_tshirts', sports_tshirtRouter);
app.use('/api/polo_tshirts', polo_tshirtRouter);
app.use('/api/dry_fit_tshirts', dry_fit_tshirtRouter);
app.use('/api/hoodies', hoodieRouter);
app.use('/api/caps', capRouter);
app.use('/api/wallets', walletRouter);
app.use('/api/certificates', certificateRouter);
app.use('/api/cushion_covers', cushion_coverRouter);
app.use('/api/magnetic_photoframes', magnetic_photoframeRouter);
app.use('/api/acrylic_photoprints', acrylic_photoprintsRouter);
app.use('/api/id_landyards', id_landyardRouter);
app.use('/api/pencils', pencilRouter);
app.use('/api/checkbook_covers', checkbook_coverRouter);
app.use('/api/clutches', clutcheRouter);
app.use('/api/slingbags', slingbagRouter);
app.use('/api/travelbags', travelbagRouter);
app.use('/api/schoolbags', schoolbagRouter);
app.use('/api/non_wovenbags', non_wovenbagRouter);
app.use('/api/wildcraftbags', wildcraftbagRouter);
app.use('/api/headphones', headphoneRouter);
app.use('/api/laptop_skins', laptop_skinRouter);
app.use('/api/mobile_accessories', mobile_accessorieRouter);
app.use('/api/magnifires', magnifireRouter);
app.use('/api/cushions', cushionRouter);
app.use('/api/bags_wallets', bag_walletRouter);
app.use('/api/bottle_sippers', bottle_sipperRouter);

app.use('/api/giftcards', giftcardRouter);
app.use('/api/posters', posterRouter);
app.use('/api/stamps', stampRouter);
app.use('/api/tags', tagRouter);
app.use('/api/sustainablesitems', sustainalitemRouter);

app.use('/api/pramotionalproducts', pramotionalproRouter);
app.use('/api/speakers', speakerRouter);
app.use('/api/pens', penRouter);
app.use('/api/rubikcubs', rubikcubRouter);
app.use('/api/glasstumblers', glasstumblerRouter);
app.use('/api/desktopitems', desktopitemRouter);

app.use(bodyParser.json());

const reviewsRouter = require('./routes/reviewRouter'); // Import reviews router
const tshirtReviewRouter = require('./reviews Router/tshirtReviewRouter'); 
const frosted_mugRevRoutes = require('./reviews Router/frosted_mugRevRoutes'); 
const awardRevRouter = require('./reviews Router/awardRevRouter'); 
const badgeRevRouter = require('./reviews Router/badgeRevRouter'); 
const bagRevRouter = require('./reviews Router/bagRevRouter'); 
const mugRevRouter = require('./reviews Router/mugRevRouter'); 
const couplemugRevrouter = require('./reviews Router/couplemugRevrouter'); 
const paper_mugRevRouter = require('./reviews Router/paper_mugRevRouter'); 
const bamboo_mugRevouter = require('./reviews Router/bamboo_mugRevouter'); 
const hotcold_sipRevRouter = require('./reviews Router/hotcold_sipRevRouter'); 
const diaryRevRouter = require('./reviews Router/diaryRevRouter'); 
const travel_mugRevRouter = require('./reviews Router/travel_mugRevRouter'); 
const mgnamplateRevRouter = require('./reviews Router/mgnamplateRevRouter'); 
const mousepadRevRouter = require('./reviews Router/mousepadRevRouter'); 
const mobholdRevRouter = require('./reviews Router/mobholdRevRouter'); 
const clothingRevRouter = require('./reviews Router/clothingRevRouter'); 
const pendriveRevRouter = require('./reviews Router/pendriveRevRouter'); 
const bearmugRevRouter = require('./reviews Router/bearmugRevRouter'); 
const magicmugRevRouter = require('./reviews Router/magicmugRevRouter'); 
const stationaryRevRoutes = require('./reviews Router/stationaryRevRoutes'); 
const shotglassRevRouter = require('./reviews Router/shotglassRevRouter'); 
const gistsetRevRouter = require('./reviews Router/gistsetRevRouter'); 
const notedirRevRouter = require('./reviews Router/notedirRevRouter'); 
const notebookRevRouter = require('./reviews Router/notebookRevRouter'); 
const singleWallSipRevRouter = require('./reviews Router/singleWallSipRevRouter'); 
const plasticSipRevRouter = require('./reviews Router/plasticSipRevRouter'); 
const copperborRevRouter = require('./reviews Router/copperborRevRouter'); 
const antiskitbotRevRouter = require('./reviews Router/antiskitbotRevRouter'); 
const bamboobotRevRouter = require('./reviews Router/bamboobotRevRouter'); 
const borosiliglassbotRevRouter = require('./reviews Router/borosiliglassbotRevRouter'); 
const shakerbotRevRouter = require('./reviews Router/shakerbotRevRouter'); 
const roundmgbdgRevRouter = require('./reviews Router/roundmgbdgRevRouter'); 
const pocmgbdgRevrouter = require('./reviews Router/pocmgbdgRevrouter'); 
const metlmgbdeRevRouter = require('./reviews Router/metlmgbdeRevRouter'); 
const roundpinbdgRevRouter = require('./reviews Router/roundpinbdgRevRouter'); 
const acrnmbdeRevRouter = require('./reviews Router/acrnmbdeRevRouter'); 
const clipplabdgrevRouter = require('./reviews Router/clipplabdgrevRouter'); 
const dommgbdeRevRouter = require('./reviews Router/dommgbdeRevRouter'); 
const ovelmgbdgRevRouter = require('./reviews Router/ovelmgbdgRevRouter'); 
const laptopslvRevRouter = require('./reviews Router/laptopslvRevRouter'); 
const pinnmplateRevRouter = require('./reviews Router/pinnmplateRevRouter'); 
const domnmplateRevRouter = require('./reviews Router/domnmplateRevRouter'); 
const acrnmplateRevRouter = require('./reviews Router/acrnmplateRevRouter'); 
const metlnmplateRevRouter = require('./reviews Router/metlnmplateRevRouter');  
const powerbankRevRouter = require('./reviews Router/powerbankRevRouter'); 
const tabl_lambRevRouter = require('./reviews Router/tabl_lambRevRouter'); 
const digital_clockRevRouter = require('./reviews Router/digital_clockRevRouter'); 
const digiphframerevrouter = require('./reviews Router/digiphframerevrouter'); 
const phfreamRevrouter = require('./reviews Router/phfreamRevrouter'); 
const keychainRevRouter = require('./reviews Router/keychainRevRouter'); 
const lunchaboxRevRouter = require('./reviews Router/lunchaboxRevRouter'); 
const KettleRevRouter = require('./reviews Router/KettleRevRouter'); 
const cardHoldRevRouter = require('./reviews Router/cardHoldRevRouter'); 
const bestsellerRevRouter = require('./reviews Router/bestsellerRevRouter'); 
const fridgeMagRevrouter = require('./reviews Router/fridgeMagRevrouter'); 
const coasterRevRouter = require('./reviews Router/coasterRevRouter'); 
const BandRevRouter = require('./reviews Router/BandRevRouter'); 
const brochureRevRouter = require('./reviews Router/brochureRevRouter'); 
const standeeRevRouter = require('./reviews Router/standeeRevRouter'); 
const occasionRevRouter = require('./reviews Router/occasionRevRouter'); 
const printingRevRouter = require('./reviews Router/printingRevRouter'); 
const teachAccRevRouter = require('./reviews Router/teachAccRevRouter'); 
const sublimationItemRevRouter = require('./reviews Router/sublimationItemRevRouter'); 
const containerRevRouter = require('./reviews Router/containerRevRouter'); 
const deskStandRevRouter = require('./reviews Router/deskStandRevRouter'); 
const TotebagRevRouter = require('./reviews Router/TotebagRevRouter'); 
const jutebagRevRouter = require('./reviews Router/jutebagRevRouter'); 
const bagpackRevRouter = require('./reviews Router/bagpackRevRouter'); 
const CardPDRevRouter = require('./reviews Router/CardPDRevRouter'); 
const calenderRevrouter = require('./reviews Router/calenderRevrouter'); 
const flyerpampRevRouter = require('./reviews Router/flyerpampRevRouter'); 
const bookmarkRevRouter = require('./reviews Router/bookmarkRevRouter'); 
const folderRevrouter = require('./reviews Router/folderRevrouter'); 
const magzinRevRouter = require('./reviews Router/magzinRevRouter'); 
const TrainingMannual_ReviewRouter = require('./reviews Router/TrainingMannual_ReviewRouter'); 
const annualRepRevRouter = require('./reviews Router/annualRepRevRouter'); 
const documentpriRevRouter = require('./reviews Router/documentpriRevRouter'); 
const projectRepRevRouter = require('./reviews Router/projectRepRevRouter'); 
const stickerRevRouter = require('./reviews Router/stickerRevRouter'); 
const notepadRevRouter = require('./reviews Router/notepadRevRouter'); 
const sipperRevRouter = require('./reviews Router/sipperRevRouter'); 
const familyTshirtrevRouter = require('./reviews Router/familyTshirtrevRouter'); 
const fullsletshirtRevRouter = require('./reviews Router/fullsletshirtRevRouter'); 
const girltshirtRevRouter = require('./reviews Router/girltshirtRevRouter');
const coupleTshirtRevRouter = require('./reviews Router/coupleTshirtRevRouter');
const sportsTshirtRevRouter = require('./reviews Router/sportsTshirtRevRouter');
const polotshirtRevRouter = require('./reviews Router/polotshirtRevRouter');
const dryfittshirtRevRouter = require('./reviews Router/dryfittshirtRevRouter');
const hoodiesRevRouter = require('./reviews Router/hoodiesRevRouter');
const capRevRouter = require('./reviews Router/capRevRouter');
const wallerRevRouter = require('./reviews Router/wallerRevRouter');
const certificateRevrRouter = require('./reviews Router/certificateRevrRouter');
const cushionRevRouter = require('./reviews Router/cushionRevRouter');
const mg_phframeRevRouter = require('./reviews Router/mg_phframeRevRouter');
const acry_phFrameRevRouter = require('./reviews Router/acry_phFrameRevRouter');
const id_laynyardRevRouter = require('./reviews Router/id_laynyardRevRouter');
const pencilRevRouter = require('./reviews Router/pencilRevRouter');
const checkbook_coverRevRouter = require('./reviews Router/checkbook_coverRevRouter');
const clutchesRevRouter = require('./reviews Router/clutchesRevRouter');
const slingbagRevRouter = require('./reviews Router/slingbagRevRouter');
const travelbagRevRouter = require('./reviews Router/travelbagRevRouter');
const schoolbagRevRouter = require('./reviews Router/schoolbagRevRouter');
const non_wovenbagRevRouter = require('./reviews Router/non_wovenbagRevRouter');
const wildcraftbagRevRouter = require('./reviews Router/wildcraftbagRevRouter');
const headphoneRevRouter = require('./reviews Router/headphoneRevRouter');
const cushion_coverRevRouter = require('./reviews Router/cushion_coverRevRouter');
const laptop_skinRevRouter = require('./reviews Router/laptop_skinRevRouter');
const mobile_accRevRouter = require('./reviews Router/mobile_accRevRouter');
const bag_walletRevRouter = require('./reviews Router/bag_walletRevRouter');
const bottle_SipRevRouter = require('./reviews Router/bottle_SipRevRouter');
const magnifireRevRouter = require('./reviews Router/magnifireRevRouter');
const giftcardRevrouter = require('./reviews Router/giftcardRevrouter');
const posterrevRouter = require('./reviews Router/posterrevRouter');
const stampRevRouter = require('./reviews Router/stampRevRouter');
const tagRevRouter = require('./reviews Router/tagRevRouter');
const sustainableRevRouter = require('./reviews Router/sustainableRevRouter');
const pramotionalProRevRouter = require('./reviews Router/pramotionalProRevRouter');
const speakerRevRouter = require('./reviews Router/speakerRevRouter');
const penRevrouter = require('./reviews Router/penRevrouter');
const MouseKeyRevRouter = require('./reviews Router/MouseKeyRevRouter');
const rubikcubeRevRouter = require('./reviews Router/rubikcubeRevRouter');
const glassTumbRevRouter = require('./reviews Router/glassTumbRevRouter');
const desktopitemRevRouter = require('./reviews Router/desktopitemRevRouter');



app.use('/api/reviews', reviewsRouter); // Use reviews router
app.use('/api/treviews', tshirtReviewRouter); 
app.use('/api/fmreviews', frosted_mugRevRoutes); 
app.use('/api/areviews', awardRevRouter); 
app.use('/api/breviews', badgeRevRouter); 
app.use('/api/bagreviews', bagRevRouter); 
app.use('/api/mugreviews', mugRevRouter); 
app.use('/api/cmugreviews', couplemugRevrouter); 
app.use('/api/pmugreviews', paper_mugRevRouter); 
app.use('/api/bambo_mugreviews', bamboo_mugRevouter); 
app.use('/api/hotcoldsip_reviews', hotcold_sipRevRouter); 
app.use('/api/direviews', diaryRevRouter); 
app.use('/api/Trmugreviews', travel_mugRevRouter); 
app.use('/api/mgnmplatereviews', mgnamplateRevRouter); 
app.use('/api/moupadreviews', mousepadRevRouter); 
app.use('/api/mobreviews', mobholdRevRouter); 
app.use('/api/clothreviews', clothingRevRouter); 
app.use('/api/pendrivereviews', pendriveRevRouter); 
app.use('/api/bearmugreviews', bearmugRevRouter); 
app.use('/api/magicmugreviews', magicmugRevRouter); 
app.use('/api/stationreviews', stationaryRevRoutes); 
app.use('/api/shotglassreviews', shotglassRevRouter); 
app.use('/api/giftreviews', gistsetRevRouter); 
app.use('/api/notedirreviews', notedirRevRouter); 
app.use('/api/notebookreviews', notebookRevRouter); 
app.use('/api/singlwallsipreviews', singleWallSipRevRouter); 
app.use('/api/plasticsipreviews', plasticSipRevRouter); 
app.use('/api/acopersipreviews', copperborRevRouter); 
app.use('/api/antiskitbotreviews', antiskitbotRevRouter); 
app.use('/api/bamboobotreviews', bamboobotRevRouter); 
app.use('/api/borosilislassbotreviews', borosiliglassbotRevRouter); 
app.use('/api/shakbotreviews', shakerbotRevRouter); 
app.use('/api/roundmgbadgereviews', roundmgbdgRevRouter); 
app.use('/api/pockbdgreviews', pocmgbdgRevrouter); 
app.use('/api/metlmgbdgreviews', metlmgbdeRevRouter); 
app.use('/api/roundpinbdgreviews', roundpinbdgRevRouter); 
app.use('/api/acrnmbgereviews', acrnmbdeRevRouter); 
app.use('/api/clipplabdgreviews', clipplabdgrevRouter); 
app.use('/api/dombdgreviews', dommgbdeRevRouter); 
app.use('/api/ovelbdgreviews', ovelmgbdgRevRouter); 
app.use('/api/laptopslvreviews', laptopslvRevRouter); 
app.use('/api/pinnmplatereviews', pinnmplateRevRouter); 
app.use('/api/domnmplatereviews', domnmplateRevRouter); 
app.use('/api/acrnmplatereviews', acrnmplateRevRouter); 
app.use('/api/metlnmplaetreviews', metlnmplateRevRouter); 
app.use('/api/powerbankreviews', powerbankRevRouter);  
app.use('/api/tbllampreviews', tabl_lambRevRouter);  
app.use('/api/digitlclockreviews', digital_clockRevRouter);  
app.use('/api/digitalphframereviews', digiphframerevrouter);  
app.use('/api/phframereviews', phfreamRevrouter); 
app.use('/api/keychainreviews', keychainRevRouter);  
app.use('/api/lunchBoxreviews', lunchaboxRevRouter);  
app.use('/api/ktlreviews', KettleRevRouter); 
app.use('/api/cardholreviews', cardHoldRevRouter);  
app.use('/api/bestSelreviews', bestsellerRevRouter);  
app.use('/api/fridgemagreviews', fridgeMagRevrouter);  
app.use('/api/coastreviews', coasterRevRouter);  
app.use('/api/bandreviews', BandRevRouter);  
app.use('/api/brochurereviews', brochureRevRouter);  
app.use('/api/standeereviews', standeeRevRouter);  
app.use('/api/occasionreviews', occasionRevRouter);   
app.use('/api/printreviews', printingRevRouter);  
app.use('/api/techaccreviews', teachAccRevRouter);   
app.use('/api/sublimatereviews', sublimationItemRevRouter);  
app.use('/api/containerreviews', containerRevRouter);  
app.use('/api/deskstandreviews', deskStandRevRouter);  
app.use('/api/totebagreviews', TotebagRevRouter);  
app.use('/api/jutebagreviews', jutebagRevRouter);  
app.use('/api/bagpackreviews', bagpackRevRouter);  
app.use('/api/cardpdreviews', CardPDRevRouter);  
app.use('/api/calenderreviews', calenderRevrouter);  
app.use('/api/flyerpampreviews', flyerpampRevRouter);  
app.use('/api/bookmarkreviews', bookmarkRevRouter);    
app.use('/api/folderreviews', folderRevrouter);  
app.use('/api/magzinreviews', magzinRevRouter);  
app.use('/api/tramanreviews', TrainingMannual_ReviewRouter);  
app.use('/api/annualrepreviews', annualRepRevRouter);  
app.use('/api/docprireviews', documentpriRevRouter);  
app.use('/api/prorepreviews', projectRepRevRouter);  
app.use('/api/stickerreviews', stickerRevRouter);  
app.use('/api/notepadreviews', notepadRevRouter);  
app.use('/api/sipperreviews', sipperRevRouter);  
app.use('/api/familyreviews', familyTshirtrevRouter);  
app.use('/api/fullslvtshirtreviews', fullsletshirtRevRouter);
app.use('/api/girlstshirtreviews', girltshirtRevRouter);  
app.use('/api/coupletishirtreviews', coupleTshirtRevRouter); 
app.use('/api/sportstshreviews', sportsTshirtRevRouter); 
app.use('/api/polotshirtreviews', polotshirtRevRouter); 
app.use('/api/dryfittishreviews', dryfittshirtRevRouter); 
app.use('/api/hoodiesreviews', hoodiesRevRouter); 
app.use('/api/capreviews', capRevRouter); 
app.use('/api/walletsreviews', wallerRevRouter); 
app.use('/api/certificatereviews', certificateRevrRouter); 
app.use('/api/cushionreviews', cushionRevRouter); 
app.use('/api/mgphframreviews', mg_phframeRevRouter); 
app.use('/api/acrphframereviews', acry_phFrameRevRouter); 
app.use('/api/id_laynyardreviews', id_laynyardRevRouter); 
app.use('/api/pencilreviews', pencilRevRouter); 
app.use('/api/checkbookcoverreviews', checkbook_coverRevRouter); 
app.use('/api/clutchesreviews', clutchesRevRouter); 
app.use('/api/slingbagreviews', slingbagRevRouter); 
app.use('/api/travelbagreviews', travelbagRevRouter); 
app.use('/api/schoolbagreviews', schoolbagRevRouter); 
app.use('/api/nonwovenbagreviews', non_wovenbagRevRouter); 
app.use('/api/wildcraftbagreviews', wildcraftbagRevRouter); 
app.use('/api/headphonereviews', headphoneRevRouter); 
app.use('/api/cushionCoverreviews', cushion_coverRevRouter); 
app.use('/api/laptopSkinreviews', laptop_skinRevRouter); 
app.use('/api/mobileAccreviews', mobile_accRevRouter); 
app.use('/api/bagwalletreviews', bag_walletRevRouter); 
app.use('/api/bottle_Sipreviews', bottle_SipRevRouter); 
app.use('/api/magnifirereviews', magnifireRevRouter); 

app.use('/api/giftcardreviews', giftcardRevrouter); 
app.use('/api/posterreviews', posterrevRouter); 
app.use('/api/stampreviews', stampRevRouter); 
app.use('/api/tagreviews', tagRevRouter); 

app.use('/api/pramotionalproreviews', pramotionalProRevRouter); 
app.use('/api/susitemreviews', sustainableRevRouter); 
app.use('/api/speakerreviews', speakerRevRouter); 
app.use('/api/penreviews', penRevrouter); 
app.use('/api/mouskeyreviews', MouseKeyRevRouter); 
app.use('/api/cubereviews', rubikcubeRevRouter); 
app.use('/api/glasstumbreviews', glassTumbRevRouter); 
app.use('/api/desktopitemreviews', desktopitemRevRouter); 


// lets define admin

const adminRoute = require("./routes/admin-router")
app.use('/api/products',adminRoute)

// Search
app.use('/api', productRouter)

app.get("/" , (req, res)=>{
    app.use(express.static(path.resolve(__dirname, "Frontend", "build")));
    res.sendFile(path.resolve(__dirname, "Frontend" , "build", "index.html"));
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
