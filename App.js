import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

/* ---------------------------------------------
   SIMULATED CLOUD DATA LOADING
   --------------------------------------------- */

function fetchCloudData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: cloudUsers,
        polls: cloudPolls,
      });
    }, 400);
  });
}

/* ---------------------------------------------
   USERS (15 total)
   --------------------------------------------- */

const cloudUsers = {
  alexc: { id: 'alexc', name: 'Alex C.', started: '2025-02-03', polls: 0 },
  priyap: { id: 'priyap', name: 'Priya P.', started: '2025-03-10', polls: 0 },
  marcusr: { id: 'marcusr', name: 'Marcus R.', started: '2025-01-18', polls: 0 },
  emilyz: { id: 'emilyz', name: 'Emily Z.', started: '2025-04-22', polls: 0 },
  jordank: { id: 'jordank', name: 'Jordan K.', started: '2025-05-01', polls: 0 },
  sophiam: { id: 'sophiam', name: 'Sophia M.', started: '2025-06-11', polls: 0 },
  danielt: { id: 'danielt', name: 'Daniel T.', started: '2025-02-14', polls: 0 },
  hannahs: { id: 'hannahs', name: 'Hannah S.', started: '2025-03-19', polls: 0 },
  lucasb: { id: 'lucasb', name: 'Lucas B.', started: '2025-07-01', polls: 0 },
  mayan: { id: 'mayan', name: 'Maya N.', started: '2025-06-30', polls: 0 },
  ethanw: { id: 'ethanw', name: 'Ethan W.', started: '2025-01-09', polls: 0 },
  oliviad: { id: 'oliviad', name: 'Olivia D.', started: '2025-05-28', polls: 0 },
  chrisl: { id: 'chrisl', name: 'Chris L.', started: '2025-02-25', polls: 0 },
  bellaf: { id: 'bellaf', name: 'Bella F.', started: '2025-08-05', polls: 0 },
  ryanh: { id: 'ryanh', name: 'Ryan H.', started: '2025-03-29', polls: 0 },
};

/* ---------------------------------------------
   POLLS (10 TOTAL — CHRONOLOGICAL)
   --------------------------------------------- */

const cloudPolls = [
  {
    id: 'poll10',
    title: 'Pick the theme for the September event',
    createdAt: '2025-09-15',
    createdBy: 'sophiam',
    aiSummary:
      'AI suggested popular themes like Retro Arcade, Space Adventure, and Neon Nights because they are visually appealing and easy to decorate for.',
    options: [
      { id: 'opt1', text: 'Retro Arcade', voters: ['alexc', 'marcusr', 'lucasb'] },
      { id: 'opt2', text: 'Space Adventure', voters: ['emilyz', 'oliviad'] },
      { id: 'opt3', text: 'Neon Nights', voters: ['bellaf', 'ryanh'] },
    ],
  },
  {
    id: 'poll9',
    title: 'Decide the snack options for the Friday team meeting',
    createdAt: '2025-09-10',
    createdBy: 'jordank',
    aiSummary:
      'AI recommended snacks like chips, fruit bowls, and cookies because they require no preparation and are easy to share.',
    options: [
      { id: 'opt1', text: 'Fruit Bowls', voters: ['priyap', 'ethanw'] },
      { id: 'opt2', text: 'Chips + Salsa', voters: ['marcusr', 'lucasb'] },
      { id: 'opt3', text: 'Cookies', voters: ['bellaf'] },
    ],
  },
  {
    id: 'poll8',
    title: 'Choose the training plan for next week',
    createdAt: '2025-09-05',
    createdBy: 'ryanh',
    aiSummary:
      'AI recommended a balanced plan with alternating cardio and strength days to prevent burnout before games.',
    options: [
      { id: 'opt1', text: 'Cardio-Heavy Week', voters: ['alexc'] },
      { id: 'opt2', text: 'Balanced Plan', voters: ['mayan', 'ethanw'] },
      { id: 'opt3', text: 'Strength-Focused Week', voters: ['priyap'] },
    ],
  },
  {
    id: 'poll7',
    title: 'Pick the movie for club movie night',
    createdAt: '2025-08-28',
    createdBy: 'emilyz',
    aiSummary:
      'AI suggested action, comedy, and romance selections based on broad group appeal and availability on streaming platforms.',
    options: [
      { id: 'opt1', text: 'Action Movie', voters: ['danielt', 'lucasb'] },
      { id: 'opt2', text: 'Comedy Movie', voters: ['jordank', 'bellaf'] },
      { id: 'opt3', text: 'Romance Movie', voters: ['oliviad'] },
    ],
  },
  {
    id: 'poll6',
    title: 'Select the seating arrangement for the workshop',
    createdAt: '2025-08-20',
    createdBy: 'marcusr',
    aiSummary:
      'AI recommended circle seating for discussions, rows for presentations, and clusters for group activities.',
    options: [
      { id: 'opt1', text: 'Circle Seating', voters: ['priyap', 'sophiam'] },
      { id: 'opt2', text: 'Rows', voters: ['ryanh'] },
      { id: 'opt3', text: 'Table Clusters', voters: ['emilyz', 'danielt'] },
    ],
  },
  {
    id: 'poll5',
    title: 'Choose the volunteer activity for next month',
    createdAt: '2025-08-10',
    createdBy: 'chrisl',
    aiSummary:
      'AI proposed activities like park cleanup, donation sorting, and tutoring based on ease of organization.',
    options: [
      { id: 'opt1', text: 'Park Cleanup', voters: ['mayan'] },
      { id: 'opt2', text: 'Donation Sorting', voters: ['lucasb', 'ryanh'] },
      { id: 'opt3', text: 'Tutoring', voters: ['priyap'] },
    ],
  },
  {
    id: 'poll4',
    title: 'Decide the presentation topic for next week’s meeting',
    createdAt: '2025-07-30',
    createdBy: 'ethanw',
    aiSummary:
      'AI recommended topics like leadership skills, time management, and creative problem solving for broad applicability.',
    options: [
      { id: 'opt1', text: 'Leadership Skills', voters: ['alexc'] },
      { id: 'opt2', text: 'Time Management', voters: ['bellaf'] },
      { id: 'opt3', text: 'Creative Problem Solving', voters: ['oliviad', 'hannahs'] },
    ],
  },
  {
    id: 'poll3',
    title: 'Pick the drink options for the event',
    createdAt: '2025-07-22',
    createdBy: 'priyap',
    aiSummary:
      'AI recommended lemonade, iced tea, and soda based on popularity and availability.',
    options: [
      { id: 'opt1', text: 'Lemonade', voters: ['marcusr', 'mayan'] },
      { id: 'opt2', text: 'Iced Tea', voters: ['lucasb'] },
      { id: 'opt3', text: 'Soda', voters: ['danielt', 'ryanh'] },
    ],
  },
  {
    id: 'poll2',
    title: 'Choose the team-building activity',
    createdAt: '2025-07-10',
    createdBy: 'hannahs',
    aiSummary:
      'AI suggested activities like escape rooms, trivia challenges, and outdoor games for engagement.',
    options: [
      { id: 'opt1', text: 'Escape Room', voters: ['emilyz', 'ryanh'] },
      { id: 'opt2', text: 'Trivia Challenge', voters: ['alexc'] },
      { id: 'opt3', text: 'Outdoor Games', voters: ['bellaf', 'lucasb'] },
    ],
  },
  {
    id: 'poll1',
    title: 'Pick the schedule for Saturday practice',
    createdAt: '2025-06-29',
    createdBy: 'oliviad',
    aiSummary:
      'AI recommended morning practice for lower temperatures and higher group energy.',
    options: [
      { id: 'opt1', text: 'Morning Practice', voters: ['mayan', 'chrisl'] },
      { id: 'opt2', text: 'Afternoon Practice', voters: ['ethanw'] },
      { id: 'opt3', text: 'Evening Practice', voters: ['hannahs'] },
    ],
  },
];

/* ---------------------------------------------
   UTILITY — Count unique participants
--------------------------------------------- */

function getTotalParticipants(poll) {
  const set = new Set(poll.options.flatMap((o) => o.voters));
  return set.size;
}

/* ---------------------------------------------
   BOTTOM NAV BAR
--------------------------------------------- */

function BottomNavBar() {
  return (
    <View style={styles.bottomNav}>
      <Text style={styles.bottomNavIcon}>🏠</Text>
      <Text style={styles.bottomNavIcon}>🔔</Text>
      <Text style={styles.bottomNavIcon}>📊</Text>
      <Text style={[styles.bottomNavIcon, styles.activeNavIcon]}>👤</Text>
    </View>
  );
}

/* ---------------------------------------------
   SCREEN 1 — My Profile + Chronological Poll History
--------------------------------------------- */

function MyProfileScreen({ users, polls, onOpenPoll }) {
  const me = users['alexc']; // Profile owner

  const renderPoll = ({ item }) => {
    const participants = getTotalParticipants(item);
    return (
      <TouchableOpacity
        style={styles.pollCard}
        onPress={() => onOpenPoll(item)}
      >
        <Text style={styles.pollTitle}>{item.title}</Text>
        <View style={styles.pollMetaRow}>
          <Text style={styles.pollMeta}>Date: {item.createdAt}</Text>
          <Text style={styles.pollMeta}>Participants: {participants}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.pfpCircle}>
          <Text style={styles.pfpInitial}>{me.name[0]}</Text>
        </View>

        <View>
          <Text style={styles.profileTitle}>Public Profile</Text>
          <Text style={styles.profileName}>{me.name}</Text>
          <Text style={styles.profileSub}>
            Participant in {me.polls} polls{'\n'}Started {me.started}
          </Text>
        </View>

        <View style={styles.settingsGear}>
          <Text style={styles.settingsText}>⚙️</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Recent Polls</Text>

      <FlatList
        data={polls}
        keyExtractor={(item) => item.id}
        renderItem={renderPoll}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <BottomNavBar />
    </SafeAreaView>
  );
}

/* ---------------------------------------------
   SCREEN 2 — Poll Details + Vote Breakdown
--------------------------------------------- */

function PollDetailsScreen({ poll, users, onBack, onOptionPress, onUserPress }) {
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voters.length, 0);
  const uniqueVoters = Array.from(new Set(poll.options.flatMap((o) => o.voters)));

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

        {/* Back Button */}
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.pollScreenTitle}>{poll.title}</Text>

        {/* AI Summary */}
        <Text style={styles.sectionHeader}>AI Summary</Text>
        <Text style={styles.aiSummary}>{poll.aiSummary}</Text>

        {/* Poll Results */}
        <Text style={styles.sectionHeader}>Poll Results</Text>
        {poll.options.map((opt) => {
          const count = opt.voters.length;
          const pct = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);

          return (
            <TouchableOpacity
              key={opt.id}
              style={styles.resultRow}
              onPress={() => onOptionPress(poll, opt)}
            >
              <View style={styles.resultTextRow}>
                <Text style={styles.resultOptionText}>{opt.text}</Text>
                <Text style={styles.resultOptionMeta}>
                  {count} votes • {pct}%
                </Text>
              </View>

              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${pct}%` }]} />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Participants */}
        <Text style={styles.sectionHeader}>Participants</Text>
        <View style={styles.participantRow}>
          {uniqueVoters.map((uid) => (
            <TouchableOpacity
              key={uid}
              style={styles.participantChip}
              onPress={() => onUserPress(users[uid])}
            >
              <Text style={styles.participantText}>{users[uid].name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
}

/* ---------------------------------------------
   SCREEN 3 — Option Voters
--------------------------------------------- */

function OptionVotersScreen({ poll, option, users, onBack, onUserPress }) {
  const voterData = option.voters.map((uid) => users[uid]);

  const renderVoter = ({ item }) => (
    <TouchableOpacity
      style={styles.voterCard}
      onPress={() => onUserPress(item)}
    >
      <Text style={styles.voterName}>{item.name}</Text>
      <Text style={styles.voterEmailPlaceholder}>Tap to view profile</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.pollScreenTitle}>{poll.title}</Text>
      <Text style={styles.sectionHeader}>Voters for "{option.text}"</Text>

      <FlatList
        data={voterData}
        keyExtractor={(item) => item.id}
        renderItem={renderVoter}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 8 }}
      />

      <BottomNavBar />
    </SafeAreaView>
  );
}

/* ---------------------------------------------
   SCREEN 4 — User Profile
--------------------------------------------- */

function UserProfileScreen({ user, polls, onBack }) {
  const userPolls = polls.filter((p) =>
    p.options.some((o) => o.voters.includes(user.id))
  );

  const renderPoll = ({ item }) => {
    const participants = getTotalParticipants(item);
    return (
      <View style={styles.pollCard}>
        <Text style={styles.pollTitle}>{item.title}</Text>
        <View style={styles.pollMetaRow}>
          <Text style={styles.pollMeta}>Date: {item.createdAt}</Text>
          <Text style={styles.pollMeta}>Participants: {participants}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <View style={styles.pfpCircle}>
          <Text style={styles.pfpInitial}>{user.name[0]}</Text>
        </View>

        <View>
          <Text style={styles.profileTitle}>Public Profile</Text>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileSub}>
            Participant in {userPolls.length} polls{'\n'}Started {user.started}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Recent Polls</Text>

      <FlatList
        data={userPolls}
        keyExtractor={(item) => item.id}
        renderItem={renderPoll}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <BottomNavBar />
    </SafeAreaView>
  );
}

/* ---------------------------------------------
   ROOT APP — Handles Navigation + Cloud Loading
--------------------------------------------- */

export default function App() {
  const [screen, setScreen] = React.useState('MyProfile');
  const [selectedPoll, setSelectedPoll] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [polls, setPolls] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchCloudData().then((data) => {
      // update each user's poll count
      Object.values(data.users).forEach((u) => (u.polls = 0));

      data.polls.forEach((poll) => {
        poll.options.forEach((opt) => {
          opt.voters.forEach((uid) => {
            data.users[uid].polls++;
          });
        });
      });

      setUsers(data.users);
      setPolls(data.polls);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !users || !polls) {
    return (
      <SafeAreaView
        style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator size="large" color="#7771ff" />
        <Text style={{ color: '#fff', fontSize: 20, marginTop: 12 }}>
          Loading saved poll history...
        </Text>
      </SafeAreaView>
    );
  }

  if (screen === 'MyProfile') {
    return (
      <MyProfileScreen
        users={users}
        polls={polls.filter((p) =>
          p.options.some((o) => o.voters.includes("alexc"))
        )}
        onOpenPoll={(poll) => {
          setSelectedPoll(poll);
          setSelectedOption(null);
          setScreen('PollDetails');
        }}
      />
    );
  }

  if (screen === 'PollDetails' && selectedPoll) {
    return (
      <PollDetailsScreen
        poll={selectedPoll}
        users={users}
        onBack={() => setScreen('MyProfile')}
        onOptionPress={(poll, option) => {
          setSelectedPoll(poll);
          setSelectedOption(option);
          setScreen('OptionVoters');
        }}
        onUserPress={(user) => {
          setSelectedUser(user);
          setScreen('UserProfile');
        }}
      />
    );
  }

  if (screen === 'OptionVoters' && selectedPoll && selectedOption) {
    return (
      <OptionVotersScreen
        poll={selectedPoll}
        option={selectedOption}
        users={users}
        onBack={() => setScreen('PollDetails')}
        onUserPress={(user) => {
          setSelectedUser(user);
          setScreen('UserProfile');
        }}
      />
    );
  }

  if (screen === 'UserProfile' && selectedUser) {
    return (
      <UserProfileScreen
        user={selectedUser}
        polls={polls}
        onBack={() => {
          if (selectedOption) setScreen('OptionVoters');
          else if (selectedPoll) setScreen('PollDetails');
          else setScreen('MyProfile');
        }}
      />
    );
  }

  return null;
}

/* ---------------------------------------------
   STYLES — Larger Text + Clean Layout
--------------------------------------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050026',
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  /* Profile Header */
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  pfpCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#5d35ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  pfpInitial: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  profileTitle: {
    color: '#bbb',
    fontSize: 17,
  },
  profileName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  profileSub: {
    color: '#a4a4ff',
    fontSize: 15,
    marginTop: 4,
  },
  settingsGear: {
    marginLeft: 'auto',
  },
  settingsText: {
    fontSize: 26,
    color: '#fff',
  },

  /* Section Headers */
  sectionHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 12,
  },

  /* Poll Cards */
  pollCard: {
    backgroundColor: '#110a3b',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  pollTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  pollMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pollMeta: {
    color: '#a4a4ff',
    fontSize: 14,
  },

  /* Poll Details */
  pollScreenTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  aiSummary: {
    color: '#e0e0ff',
    fontSize: 17,
    lineHeight: 22,
  },

  /* Result Bars */
  resultRow: {
    marginTop: 14,
  },
  resultTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  resultOptionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  resultOptionMeta: {
    color: '#a4a4ff',
    fontSize: 16,
  },
  barBackground: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2f2a62',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#5d35ff',
  },

  /* Participants */
  participantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  participantChip: {
    backgroundColor: '#1b1450',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginTop: 8,
  },
  participantText: {
    color: '#fff',
    fontSize: 15,
  },

  /* Voters */
  voterCard: {
    backgroundColor: '#110a3b',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  voterName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  voterEmailPlaceholder: {
    color: '#a4a4ff',
    fontSize: 14,
    marginTop: 4,
  },

  /* Bottom Nav */
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: '#05001a',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#201b5c',
  },
  bottomNavIcon: {
    fontSize: 26,
    color: '#7771ff',
  },
  activeNavIcon: {
    color: '#ffffff',
  },

  /* Back Button */
  backText: {
    color: '#a4a4ff',
    fontSize: 18,
    marginBottom: 12,
  },
});

