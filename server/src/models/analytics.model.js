const mongoose = require('mongoose');
const parser = require('ua-parser-js');
const dailyClicksSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    }
});
const analyticsSchema = new mongoose.Schema({
    dailyClicks:[dailyClicksSchema],
    totalClicks: {
        type: Number,
        default: 0
    },
    devices: {
        type: [String],
    },
    browsers: {
        type: [String]
    },
    OS: {
        type: [String]
    },
    location: {
        type: [String]
    },
    urlID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Urls",
    }

})
analyticsSchema.methods.setAnalytics = function (user_agents) {
   this.totalClicks++;
    const u_agents = parser(user_agents);
    console.log(u_agents);
    let device = u_agents.device.model;
    const browser = u_agents.browser.name;
    const os = u_agents.os.name;
    
    try {
        if (os === "Windows" && !device) {

            device = 'PC';
            console.log("yoyo");
        }
        else if (os === 'Android') {
            device = 'Android Smartphone';

        }

    }
    catch (e) {

        console.log(e);
    }

    this.devices.push(device);
    this.browsers.push(browser);
    this.OS.push(os);

     // Update daily clicks
     const today = new Date();
     const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
     const dailyClick = this.dailyClicks.find(click => click.date.getTime() === todayDate.getTime());
 
     if (dailyClick) {
         dailyClick.clicks++;
     } else {
         this.dailyClicks.push({ date: todayDate, clicks: 1 });
     }
}

const Analytics = new mongoose.model('analytic', analyticsSchema);

module.exports = Analytics;