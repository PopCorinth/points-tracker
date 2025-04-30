import React, { useState, useEffect } from 'react';

const PointsTracker = () => {
  // Initialize state from localStorage or defaults
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('points_tracker_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [bonuses, setBonuses] = useState(() => {
    const saved = localStorage.getItem('points_tracker_bonuses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [rewards, setRewards] = useState(() => {
    const saved = localStorage.getItem('points_tracker_rewards');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [quotas, setQuotas] = useState(() => {
    const saved = localStorage.getItem('points_tracker_quotas');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [totalPoints, setTotalPoints] = useState(0);
  const [availablePoints, setAvailablePoints] = useState(0);
  const [activeDay, setActiveDay] = useState('Wednesday');
  
  // Initialize data only if not already in localStorage
  useEffect(() => {
    if (tasks.length === 0) {
      // Initialize tasks
      const initialTasks = [
        // Wednesday (April 30)
        { day: 'Wednesday', time: '7:00-8:00', activity: 'Morning beauty routine', points: 5, completed: false },
        { day: 'Wednesday', time: '8:00-10:00', activity: 'Journal & planning session', points: 5, completed: false },
        { day: 'Wednesday', time: '10:00-12:00', activity: 'Growth focus: Data Analytics Coursera', points: 10, completed: false },
        { day: 'Wednesday', time: '13:00-15:00', activity: 'Peak energy: Brandography interview prep', points: 15, completed: false },
        { day: 'Wednesday', time: '15:00-17:00', activity: 'Exploration: Volunteer research', points: 10, completed: false },
        { day: 'Wednesday', time: '17:00-19:00', activity: '30-min walk & Lemon Boursin Pasta dinner prep', points: 15, completed: false },
        { day: 'Wednesday', time: '19:00-21:00', activity: 'Hobby time: Crochet project', points: 10, completed: false },
        { day: 'Wednesday', time: '21:00-00:00', activity: 'Wind down & bedtime by midnight', points: 5, completed: false },
        
        // Thursday (May 1)
        { day: 'Thursday', time: '7:00-8:00', activity: 'Morning beauty routine', points: 5, completed: false },
        { day: 'Thursday', time: '8:00-10:00', activity: 'Kitchen tidying', points: 5, completed: false },
        { day: 'Thursday', time: '10:00-12:00', activity: 'Home organization: Decluttering', points: 10, completed: false },
        { day: 'Thursday', time: '12:00-13:00', activity: 'Slow cooker chicken dinner prep', points: 10, completed: false },
        { day: 'Thursday', time: '13:00-15:00', activity: 'Peak energy: Digital cleanup', points: 10, completed: false },
        { day: 'Thursday', time: '15:00-17:00', activity: 'Errands/appointments', points: 5, completed: false },
        { day: 'Thursday', time: '17:00-19:00', activity: 'Light movement & dinner', points: 5, completed: false },
        { day: 'Thursday', time: '19:00-21:00', activity: 'Reading time & hobby', points: 5, completed: false },
        { day: 'Thursday', time: '21:00-00:00', activity: 'Wind down & bedtime by midnight', points: 5, completed: false },
        
        // Friday (May 2)
        { day: 'Friday', time: '7:00-8:00', activity: 'Morning beauty routine', points: 5, completed: false },
        { day: 'Friday', time: '8:00-10:00', activity: 'Prep for Brain Dump: gather materials/workspace setup', points: 5, completed: false },
        { day: 'Friday', time: '10:00-11:00', activity: 'Brain Dump part 1: Mind sweep & idea capture', points: 10, completed: false },
        { day: 'Friday', time: '11:00-12:00', activity: 'Brain Dump part 2: Categorize & prioritize', points: 10, completed: false },
        { day: 'Friday', time: '13:00-14:00', activity: 'Brain Dump part 3: Action items & next steps', points: 10, completed: false },
        { day: 'Friday', time: '14:00-15:00', activity: 'Yoga Sculpt class', points: 10, completed: false },
        { day: 'Friday', time: '15:00-17:00', activity: 'Creative project time', points: 10, completed: false },
        { day: 'Friday', time: '17:00-20:00', activity: 'Date night with husband', points: 15, completed: false },
        { day: 'Friday', time: '20:00-22:00', activity: 'Evening social time', points: 5, completed: false },
        { day: 'Friday', time: '22:00-00:00', activity: 'Wind down & bedtime by midnight', points: 5, completed: false },
        
        // Saturday
        { day: 'Saturday', time: '8:00-9:00', activity: 'Weekend beauty routine', points: 5, completed: false },
        { day: 'Saturday', time: '9:00-10:00', activity: 'Morning relaxation', points: 0, completed: false },
        { day: 'Saturday', time: '10:00-12:00', activity: 'Outdoor activity: Hike or e-bike', points: 15, completed: false },
        { day: 'Saturday', time: '13:00-15:00', activity: 'Rock climbing session', points: 10, completed: false },
        { day: 'Saturday', time: '15:00-17:00', activity: 'Personal hobby time', points: 5, completed: false },
        { day: 'Saturday', time: '17:00-19:00', activity: 'Dinner & social time', points: 10, completed: false },
        
        // Sunday
        { day: 'Sunday', time: '7:00-8:00', activity: 'Weekend beauty routine', points: 5, completed: false },
        { day: 'Sunday', time: '8:00-10:00', activity: 'Weekly planning & partner meeting prep', points: 10, completed: false },
        { day: 'Sunday', time: '10:00-12:00', activity: 'Weekly partner meeting', points: 15, completed: false },
        { day: 'Sunday', time: '12:00-13:00', activity: 'Light meal prep for week ahead', points: 10, completed: false },
        { day: 'Sunday', time: '13:00-14:00', activity: 'Beauty routine & self-care', points: 10, completed: false },
        { day: 'Sunday', time: '14:00-16:00', activity: 'Rest/prep for dodgeball', points: 5, completed: false },
        { day: 'Sunday', time: '16:00-17:00', activity: 'Travel to dodgeball', points: 5, completed: false },
        { day: 'Sunday', time: '17:00-19:00', activity: 'Dodgeball social league', points: 15, completed: false },
        { day: 'Sunday', time: '19:00-21:00', activity: 'Rhein Haus social with league', points: 10, completed: false },
        { day: 'Sunday', time: '21:00-22:00', activity: 'Shower & wind down', points: 5, completed: false },
        { day: 'Sunday', time: '22:00-00:00', activity: 'Prepare for Monday & bedtime', points: 5, completed: false }
      ];
      
      setTasks(initialTasks);
    }
    
    if (bonuses.length === 0) {
      // Initialize bonuses
      const initialBonuses = [
        { type: 'Weekly Streak', description: 'Complete 5 days in a row of daily time blocks', points: 50, completed: false },
        { type: 'Level Up Challenge', description: 'Complete Coursera module + 2 job applications', points: 75, completed: false },
        { type: 'Social Quest', description: 'Attend new group & make 2 connections', points: 100, completed: false }
      ];
      
      setBonuses(initialBonuses);
    }
    
    if (rewards.length === 0) {
      // Initialize rewards
      const initialRewards = [
        { tier: '30 pts', description: '30 min Stardew Valley', points: 30, redeemed: false },
        { tier: '60 pts', description: '1 hour Netflix/streaming', points: 60, redeemed: false },
        { tier: '100 pts', description: 'Special coffee or treat', points: 100, redeemed: false },
        { tier: '150 pts', description: 'Small purchase under $15', points: 150, redeemed: false },
        { tier: '300 pts', description: 'Fun local experience', points: 300, redeemed: false },
        { tier: '500 pts', description: 'Weekend day trip', points: 500, redeemed: false },
        { tier: '1000 pts', description: 'Major treat (climbing gear etc)', points: 1000, redeemed: false }
      ];
      
      setRewards(initialRewards);
    }
    
    if (quotas.length === 0) {
      // Initialize quotas
      const initialQuotas = [
        // Health
        { category: 'Health', type: 'Exercise 1', description: '30-min walk (Wednesday)', points: 10, completed: false },
        { category: 'Health', type: 'Exercise 2', description: 'Yoga Sculpt (Friday)', points: 10, completed: false },
        { category: 'Health', type: 'Exercise 3', description: 'Rock climbing (Saturday)', points: 10, completed: false },
        { category: 'Health', type: 'Exercise 4', description: 'Dodgeball (Sunday)', points: 10, completed: false },
        { category: 'Health', type: 'Beauty', description: 'Daily beauty routine', points: 15, completed: false },
        { category: 'Health', type: 'Wellness', description: '5 days vitamins & hydration', points: 10, completed: false },
        { category: 'Health', type: 'Healthcare', description: 'Provider research for refill', points: 10, completed: false },
        { category: 'Health', type: 'Sleep', description: 'Bedtime by midnight 4/5 nights', points: 10, completed: false },
        
        // Career
        { category: 'Career', type: 'Learning', description: '5 hours Coursera total', points: 20, completed: false },
        { category: 'Career', type: 'Interview', description: 'Brandography preparation', points: 15, completed: false },
        { category: 'Career', type: 'Portfolio', description: '1 GitHub update', points: 15, completed: false },
        
        // Home
        { category: 'Home', type: 'Organization', description: 'Complete Brain Dump Day', points: 15, completed: false },
        { category: 'Home', type: 'Digital', description: 'Digital cleanup (Thursday)', points: 10, completed: false },
        { category: 'Home', type: 'Physical', description: 'Declutter priority area', points: 10, completed: false },
        { category: 'Home', type: 'Planning', description: 'Weekly planning + partner meeting', points: 15, completed: false },
        
        // Community
        { category: 'Community', type: 'Social 1', description: 'Date night (Friday)', points: 15, completed: false },
        { category: 'Community', type: 'Social 2', description: 'Dodgeball league & Rhein Haus', points: 15, completed: false },
        { category: 'Community', type: 'Exploration', description: '1 outdoor activity (Saturday)', points: 15, completed: false },
        { category: 'Community', type: 'Hobby', description: '30+ minutes hobby time', points: 10, completed: false },
        { category: 'Community', type: 'Volunteer', description: 'Research opportunities', points: 10, completed: false }
      ];
      
      setQuotas(initialQuotas);
    }
  }, [tasks.length, bonuses.length, rewards.length, quotas.length]);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('points_tracker_tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem('points_tracker_bonuses', JSON.stringify(bonuses));
  }, [bonuses]);
  
  useEffect(() => {
    localStorage.setItem('points_tracker_rewards', JSON.stringify(rewards));
  }, [rewards]);
  
  useEffect(() => {
    localStorage.setItem('points_tracker_quotas', JSON.stringify(quotas));
  }, [quotas]);
  
  useEffect(() => {
    // Calculate total points earned
    const taskPoints = tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0);
    const bonusPoints = bonuses.reduce((sum, bonus) => sum + (bonus.completed ? bonus.points : 0), 0);
    const earned = taskPoints + bonusPoints;
    
    // Calculate points spent on rewards
    const spent = rewards.reduce((sum, reward) => sum + (reward.redeemed ? reward.points : 0), 0);
    
    setTotalPoints(earned);
    setAvailablePoints(earned - spent);
  }, [tasks, bonuses, rewards]);
  
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
  
  const toggleBonusCompletion = (index) => {
    const updatedBonuses = [...bonuses];
    updatedBonuses[index].completed = !updatedBonuses[index].completed;
    setBonuses(updatedBonuses);
  };
  
  const toggleRewardRedemption = (index) => {
    const updatedRewards = [...rewards];
    const reward = updatedRewards[index];
    
    // Only allow redemption if enough points are available
    if (!reward.redeemed) {
      if (availablePoints >= reward.points) {
        reward.redeemed = true;
        setRewards(updatedRewards);
      } else {
        alert(`Not enough points! You need ${reward.points} points but only have ${availablePoints} available.`);
      }
    } else {
      reward.redeemed = false;
      setRewards(updatedRewards);
    }
  };
  
  const toggleQuotaCompletion = (index) => {
    const updatedQuotas = [...quotas];
    updatedQuotas[index].completed = !updatedQuotas[index].completed;
    setQuotas(updatedQuotas);
  };
  
  const getDayTasks = (day) => {
    return tasks.filter(task => task.day === day);
  };
  
  const getQuotasByCategory = (category) => {
    return quotas.filter(quota => quota.category === category);
  };
  
  const renderDaySection = (day) => {
    const dayTasks = getDayTasks(day);
    const dayPoints = dayTasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0);
    const totalPossible = dayTasks.reduce((sum, task) => sum + task.points, 0);
    
    return (
      <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-indigo-700">{day}</h3>
          <div className="text-sm">
            <span className="font-semibold">{dayPoints}</span>/{totalPossible} pts earned
          </div>
        </div>
        
        <div className="space-y-2">
          {dayTasks.map((task, index) => {
            const taskIndex = tasks.findIndex(t => t === task);
            return (
              <div 
                key={index} 
                className={`flex items-start p-2 rounded ${task.completed ? 'bg-green-50' : 'hover:bg-gray-50'}`}
              >
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTaskCompletion(taskIndex)}
                  className="mt-1 mr-3"
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">{task.time}</span>
                    <span className="text-indigo-600 font-semibold">{task.points} pts</span>
                  </div>
                  <div className={task.completed ? 'line-through text-gray-500' : ''}>{task.activity}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderQuotaSection = (category) => {
    const categoryQuotas = getQuotasByCategory(category);
    const completed = categoryQuotas.filter(q => q.completed).length;
    const total = categoryQuotas.length;
    
    let bgColor = 'bg-gray-50';
    switch(category) {
      case 'Health': bgColor = 'bg-green-50'; break;
      case 'Career': bgColor = 'bg-blue-50'; break;
      case 'Home': bgColor = 'bg-indigo-50'; break;
      case 'Community': bgColor = 'bg-purple-50'; break;
      default: bgColor = 'bg-gray-50';
    }
    
    return (
      <div className={`p-4 rounded-lg shadow border ${bgColor}`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-700">{category}</h3>
          <div className="text-sm">
            <span className="font-semibold">{completed}</span>/{total} completed
          </div>
        </div>
        
        <div className="space-y-2">
          {categoryQuotas.map((quota, index) => {
            const quotaIndex = quotas.findIndex(q => q === quota);
            return (
              <div 
                key={index} 
                className={`flex items-start p-2 rounded ${quota.completed ? 'bg-white bg-opacity-60' : 'hover:bg-white hover:bg-opacity-30'}`}
              >
                <input 
                  type="checkbox" 
                  checked={quota.completed} 
                  onChange={() => toggleQuotaCompletion(quotaIndex)}
                  className="mt-1 mr-3"
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="font-medium">{quota.type}</span>
                    <span className="text-indigo-600 font-semibold">{quota.points} pts</span>
                  </div>
                  <div className={`text-sm ${quota.completed ? 'line-through text-gray-500' : ''}`}>{quota.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-indigo-100 p-4 rounded-lg">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-indigo-700">Tiempo Intencional: Points Tracker</h1>
          <p className="text-gray-600">April 30 - May 4, 2025</p>
        </div>
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-700">{totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">{availablePoints}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>
      </div>
      
      {/* Main content with tabs */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-4">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Daily Tasks</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <button 
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-3 py-1 rounded-md text-sm ${activeDay === day 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {day}
              </button>
            ))}
          </div>
          {activeDay === 'Wednesday' && renderDaySection('Wednesday')}
          {activeDay === 'Thursday' && renderDaySection('Thursday')}
          {activeDay === 'Friday' && renderDaySection('Friday')}
          {activeDay === 'Saturday' && renderDaySection('Saturday')}
          {activeDay === 'Sunday' && renderDaySection('Sunday')}
          
          {/* Bonus Challenges */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg shadow border border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-700 mb-3">Bonus Challenges</h3>
            <div className="space-y-2">
              {bonuses.map((bonus, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-2 rounded ${bonus.completed ? 'bg-yellow-100' : 'hover:bg-yellow-100 hover:bg-opacity-50'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={bonus.completed} 
                    onChange={() => toggleBonusCompletion(index)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium">{bonus.type}</span>
                      <span className="text-yellow-600 font-semibold">+{bonus.points} pts</span>
                    </div>
                    <div className={bonus.completed ? 'line-through text-gray-500' : ''}>{bonus.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3 space-y-6">
          {/* Rewards Section */}
          <div className="p-4 bg-purple-50 rounded-lg shadow border border-purple-200">
            <h3 className="text-lg font-bold text-purple-700 mb-3">Rewards</h3>
            <div className="p-2 mb-4 bg-white rounded-lg text-center">
              <span className="text-xl font-bold text-green-600">{availablePoints}</span> points available
            </div>
            <div className="space-y-2">
              {rewards.map((reward, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-2 rounded cursor-pointer ${
                    reward.redeemed 
                      ? 'bg-purple-100' 
                      : availablePoints >= reward.points 
                        ? 'hover:bg-purple-100 hover:bg-opacity-50' 
                        : 'opacity-50'
                  }`}
                  onClick={() => toggleRewardRedemption(index)}
                >
                  <input 
                    type="checkbox" 
                    checked={reward.redeemed} 
                    onChange={() => {}}
                    className="mt-1 mr-3"
                    disabled={!reward.redeemed && availablePoints < reward.points}
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium">{reward.tier}</span>
                      <span className="text-purple-600 font-semibold">{reward.points} pts</span>
                    </div>
                    <div className={reward.redeemed ? 'line-through text-gray-500' : ''}>{reward.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Weekly Quotas */}
          <h3 className="text-lg font-bold text-indigo-700">Weekly Quotas</h3>
          <div className="space-y-4">
            {renderQuotaSection('Health')}
            {renderQuotaSection('Career')}
            {renderQuotaSection('Home')}
            {renderQuotaSection('Community')}
          </div>
          
          {/* Spanish encouragement */}
          <div className="p-3 bg-indigo-50 rounded-lg text-center border border-indigo-200">
            <p className="italic text-indigo-700">¡Tú puedes lograrlo! Cada pequeño paso cuenta.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsTracker;
