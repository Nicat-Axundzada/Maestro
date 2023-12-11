import data from "./allProsData.json" assert {type: "json"};

const taskersContainer = document.querySelector('.taskers');
const topProContainer = document.querySelector('.topProContainer');
let isCheckedTopPro = false;
const newProContainer = document.querySelector('.newProContainer');
let isCheckedNewPro = false;
const supervisorContainer = document.querySelector('.supervisorContainer');
let isCheckedSupervisor = false;
const proContainer = document.querySelector('.proContainer');
let isCheckedPro = false;
const selectedRating = document.getElementById('rating');
const selectedCount = document.getElementById('count');

const taskers = data.data.taskers;

function checkboxFilter(taskers) {
  const ratingDescTasksAsc = taskers.slice().sort((a, b) => {
    if (a.averageRating !== b.averageRating) {
      return b.averageRating - a.averageRating; 
    } else {
      return a.completedTasks - b.completedTasks; 
    }
  });

  const ratingDescTasksDesc = taskers.slice().sort((a, b) => {
    if (a.averageRating !== b.averageRating) {
      return b.averageRating - a.averageRating;
    } else {
      return b.completedTasks - a.completedTasks; 
    }
  });

  const ratingAscTasksAsc = taskers.slice().sort((a, b) => {
    if (a.averageRating !== b.averageRating) {
      return a.averageRating - b.averageRating; 
    } else {
      return a.completedTasks - b.completedTasks; 
    }
  });

  const ratingAscTasksDesc = taskers.slice().sort((a, b) => {
    if (a.averageRating !== b.averageRating) {
      return a.averageRating - b.averageRating; 
    } else {
      return b.completedTasks - a.completedTasks; 
    }
  });

  const selectedRating = document.querySelector('#rating').value;
  const selectedCount  = document.querySelector('#count').value;

  if (selectedRating === 'descending' && selectedCount==='ascending') {taskers = ratingDescTasksAsc}
  else if (selectedRating === 'descending' && selectedCount==='descending') {taskers = ratingDescTasksDesc}
  else if (selectedRating === 'ascending' && selectedCount === 'ascending') {taskers = ratingAscTasksAsc}
  else {taskers = ratingAscTasksDesc}

  return taskers

}

function filterTaskersByStartDate(taskers) {
    const today = new Date(); 
    const threeMonthsAgo = new Date(); 
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
    const filteredTaskers = taskers.filter(tasker => {
      const startDate = new Date(tasker.startDate); 
      return startDate <= today && startDate >= threeMonthsAgo;
    });
  
    return filteredTaskers;
  };

const  newTop= filterTaskersByStartDate(taskers);

const topPro = taskers.filter(tasker => tasker.eliteTasker);

const superVisor = taskers.filter(tasker=> tasker.supervisor);

const pro = [];

taskers.forEach(tasker=>{ 
    if (!tasker.isTopPro && !tasker.isSuperVisor) pro.push(tasker);
});

function isTopPro(tasker) {
    return tasker.eliteTasker;
};

function isSuperVisor(tasker) {
    return tasker.supervisor;
};

function isNewPro(tasker) {
    const today = new Date(); 
    const threeMonthsAgo = new Date(); 
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const startDate = new Date(tasker.startDate); 
    return startDate <= today && startDate >= threeMonthsAgo;
};

function allTaskers(taskers) {
    taskers = checkboxFilter(taskers);
    taskers.forEach((tasker)=>{
        const div = document.createElement('div');
        let profileimg = tasker.user.profile_picture;
        if (profileimg===null) profileimg={publicUrl:""};
        div.className='tasker';
        if (isSuperVisor(tasker)){
            div.innerHTML = `
            <div class='tasker-top'>
                <div class='imgcontainer'style='background-image:url(${profileimg.publicUrl}) '></div>
                <div class='tasker-info'>
                    <p>${tasker.user.name}</p>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="76" height="12" viewBox="0 0 76 12" fill="none">
                        <path d="M21.4567 1.0996C21.6791 0.649501 22.3209 0.649501 22.5433 1.0996L23.7131 3.4668C23.8013 3.64541 23.9717 3.76924 24.1688 3.79802L26.7845 4.17994C27.2816 4.25252 27.4797 4.86368 27.1196 5.21402L25.2287 7.05385C25.0855 7.19312 25.0202 7.39396 25.054 7.59079L25.5002 10.1899C25.5852 10.6849 25.0657 11.0626 24.6211 10.829L22.2819 9.60012C22.1054 9.50742 21.8946 9.50741 21.7181 9.60012L19.3789 10.829C18.9343 11.0626 18.4148 10.6849 18.4998 10.1899L18.946 7.59079C18.9798 7.39396 18.9145 7.19312 18.7713 7.05385L16.8804 5.21402C16.5203 4.86368 16.7184 4.25252 17.2155 4.17994L19.8312 3.79802C20.0283 3.76924 20.1987 3.64541 20.2869 3.4668L21.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M5.45665 1.0996C5.67906 0.649501 6.32094 0.649501 6.54335 1.0996L7.71305 3.4668C7.80131 3.64541 7.9717 3.76924 8.16883 3.79802L10.7845 4.17994C11.2816 4.25252 11.4797 4.86368 11.1196 5.21402L9.22867 7.05385C9.08553 7.19312 9.0202 7.39396 9.05399 7.59079L9.50024 10.1899C9.58523 10.6849 9.06572 11.0626 8.62106 10.829L6.28186 9.60012C6.10539 9.50742 5.89461 9.50741 5.71814 9.60012L3.37894 10.829C2.93428 11.0626 2.41477 10.6849 2.49976 10.1899L2.94601 7.59079C2.97981 7.39396 2.91447 7.19312 2.77133 7.05385L0.880399 5.21402C0.520326 4.86368 0.71836 4.25252 1.21548 4.17994L3.83117 3.79802C4.0283 3.76924 4.19869 3.64541 4.28695 3.4668L5.45665 1.0996Z" fill="#FFC107"/>
                        <path d="M37.4567 1.0996C37.6791 0.649501 38.3209 0.649501 38.5433 1.0996L39.7131 3.4668C39.8013 3.64541 39.9717 3.76924 40.1688 3.79802L42.7845 4.17994C43.2816 4.25252 43.4797 4.86368 43.1196 5.21402L41.2287 7.05385C41.0855 7.19312 41.0202 7.39396 41.054 7.59079L41.5002 10.1899C41.5852 10.6849 41.0657 11.0626 40.6211 10.829L38.2819 9.60012C38.1054 9.50742 37.8946 9.50741 37.7181 9.60012L35.3789 10.829C34.9343 11.0626 34.4148 10.6849 34.4998 10.1899L34.946 7.59079C34.9798 7.39396 34.9145 7.19312 34.7713 7.05385L32.8804 5.21402C32.5203 4.86368 32.7184 4.25252 33.2155 4.17994L35.8312 3.79802C36.0283 3.76924 36.1987 3.64541 36.2869 3.4668L37.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M53.4567 1.0996C53.6791 0.649501 54.3209 0.649501 54.5433 1.0996L55.7131 3.4668C55.8013 3.64541 55.9717 3.76924 56.1688 3.79802L58.7845 4.17994C59.2816 4.25252 59.4797 4.86368 59.1196 5.21402L57.2287 7.05385C57.0855 7.19312 57.0202 7.39396 57.054 7.59079L57.5002 10.1899C57.5852 10.6849 57.0657 11.0626 56.6211 10.829L54.2819 9.60012C54.1054 9.50742 53.8946 9.50741 53.7181 9.60012L51.3789 10.829C50.9343 11.0626 50.4148 10.6849 50.4998 10.1899L50.946 7.59079C50.9798 7.39396 50.9145 7.19312 50.7713 7.05385L48.8804 5.21402C48.5203 4.86368 48.7184 4.25252 49.2155 4.17994L51.8312 3.79802C52.0283 3.76924 52.1987 3.64541 52.2869 3.4668L53.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M69.4567 1.0996C69.6791 0.649501 70.3209 0.649501 70.5433 1.0996L71.7131 3.4668C71.8013 3.64541 71.9717 3.76924 72.1688 3.79802L74.7845 4.17994C75.2816 4.25252 75.4797 4.86368 75.1196 5.21402L73.2287 7.05385C73.0855 7.19312 73.0202 7.39396 73.054 7.59079L73.5002 10.1899C73.5852 10.6849 73.0657 11.0626 72.6211 10.829L70.2819 9.60012C70.1054 9.50742 69.8946 9.50741 69.7181 9.60012L67.3789 10.829C66.9343 11.0626 66.4148 10.6849 66.4998 10.1899L66.946 7.59079C66.9798 7.39396 66.9145 7.19312 66.7713 7.05385L64.8804 5.21402C64.5203 4.86368 64.7184 4.25252 65.2155 4.17994L67.8312 3.79802C68.0283 3.76924 68.1987 3.64541 68.2869 3.4668L69.4567 1.0996Z" fill="#FFC107"/>
                        </svg>
                        <span style="color:#FFC107; margin-left:8px;">${tasker.averageRating}</span>
                    </div>
                </div>
            </div>
            <div class='tasker-mid'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M12 7.5L8.25 11.25L6.75 9.75" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.64314 1.42397C8.32453 0.525342 9.67547 0.525342 10.3569 1.42397L11.2079 2.5463C11.3938 2.79146 11.6975 2.91726 12.0023 2.87535L13.3976 2.6835C14.5149 2.52988 15.4701 3.48514 15.3165 4.60239L15.1247 5.99774C15.0827 6.30254 15.2085 6.60624 15.4537 6.79214L16.576 7.64314C17.4747 8.32453 17.4747 9.67547 16.576 10.3569L15.4537 11.2079C15.2085 11.3938 15.0827 11.6975 15.1247 12.0023L15.3165 13.3976C15.4701 14.5149 14.5149 15.4701 13.3976 15.3165L12.0023 15.1247C11.6975 15.0827 11.3938 15.2085 11.2079 15.4537L10.3569 16.576C9.67547 17.4747 8.32453 17.4747 7.64314 16.576L6.79214 15.4537C6.60624 15.2085 6.30254 15.0827 5.99774 15.1247L4.60238 15.3165C3.48514 15.4701 2.52988 14.5149 2.6835 13.3976L2.87535 12.0023C2.91726 11.6975 2.79146 11.3938 2.5463 11.2079L1.42397 10.3569C0.525342 9.67547 0.525342 8.32453 1.42397 7.64314L2.5463 6.79214C2.79146 6.60624 2.91726 6.30254 2.87535 5.99774L2.6835 4.60238C2.52988 3.48514 3.48514 2.52988 4.60239 2.6835L5.99774 2.87535C6.30254 2.91726 6.60624 2.79146 6.79214 2.5463L7.64314 1.42397Z" stroke="#5920BC" stroke-width="1.5"/>
                    </svg>
                    <p>${tasker.completedTasks} Tasks</p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M0.75 9C0.75 10.8358 0.849343 12.2598 1.09615 13.3703C1.34105 14.4723 1.72108 15.219 2.25102 15.749C2.78095 16.2789 3.52774 16.6589 4.62973 16.9039C5.74025 17.1507 7.16424 17.25 9 17.25C10.8358 17.25 12.2598 17.1507 13.3703 16.9039C14.4723 16.6589 15.219 16.2789 15.749 15.749C16.2789 15.219 16.6589 14.4723 16.9039 13.3703C17.1507 12.2598 17.25 10.8358 17.25 9C17.25 7.16424 17.1507 5.74025 16.9039 4.62974C16.6589 3.52774 16.2789 2.78095 15.749 2.25102C15.219 1.72108 14.4723 1.34105 13.3703 1.09615C12.2598 0.849342 10.8358 0.75 9 0.75C7.16424 0.75 5.74025 0.849342 4.62973 1.09615C3.52774 1.34105 2.78095 1.72108 2.25102 2.25102C1.72108 2.78095 1.34105 3.52774 1.09615 4.62973C0.849343 5.74025 0.75 7.16424 0.75 9Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 5.25V7.5M7.5 12.75V7.5M7.5 7.5H5.25H10.5M12.75 7.5H10.5M10.5 7.5V5.25V10.5M10.5 12.75V10.5M10.5 10.5H12.75H5.25" stroke="#5920BC" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Supervisor</p>
                </div>
                <div class='newpro'>
    
                </div>
            </div>
            <div class='tasker-bio'>
                <p>${tasker.bio}</p>
            </div>
            <button class='book'>Book Now</button>
        `;
        }
    
        else if (isTopPro(tasker)){
            div.innerHTML = `
            <div class='tasker-top'>
                <div class='imgcontainer'style='background-image:url(${profileimg.publicUrl}) '></div>
                <div class='tasker-info'>
                    <p>${tasker.user.name}</p>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="76" height="12" viewBox="0 0 76 12" fill="none">
                        <path d="M21.4567 1.0996C21.6791 0.649501 22.3209 0.649501 22.5433 1.0996L23.7131 3.4668C23.8013 3.64541 23.9717 3.76924 24.1688 3.79802L26.7845 4.17994C27.2816 4.25252 27.4797 4.86368 27.1196 5.21402L25.2287 7.05385C25.0855 7.19312 25.0202 7.39396 25.054 7.59079L25.5002 10.1899C25.5852 10.6849 25.0657 11.0626 24.6211 10.829L22.2819 9.60012C22.1054 9.50742 21.8946 9.50741 21.7181 9.60012L19.3789 10.829C18.9343 11.0626 18.4148 10.6849 18.4998 10.1899L18.946 7.59079C18.9798 7.39396 18.9145 7.19312 18.7713 7.05385L16.8804 5.21402C16.5203 4.86368 16.7184 4.25252 17.2155 4.17994L19.8312 3.79802C20.0283 3.76924 20.1987 3.64541 20.2869 3.4668L21.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M5.45665 1.0996C5.67906 0.649501 6.32094 0.649501 6.54335 1.0996L7.71305 3.4668C7.80131 3.64541 7.9717 3.76924 8.16883 3.79802L10.7845 4.17994C11.2816 4.25252 11.4797 4.86368 11.1196 5.21402L9.22867 7.05385C9.08553 7.19312 9.0202 7.39396 9.05399 7.59079L9.50024 10.1899C9.58523 10.6849 9.06572 11.0626 8.62106 10.829L6.28186 9.60012C6.10539 9.50742 5.89461 9.50741 5.71814 9.60012L3.37894 10.829C2.93428 11.0626 2.41477 10.6849 2.49976 10.1899L2.94601 7.59079C2.97981 7.39396 2.91447 7.19312 2.77133 7.05385L0.880399 5.21402C0.520326 4.86368 0.71836 4.25252 1.21548 4.17994L3.83117 3.79802C4.0283 3.76924 4.19869 3.64541 4.28695 3.4668L5.45665 1.0996Z" fill="#FFC107"/>
                        <path d="M37.4567 1.0996C37.6791 0.649501 38.3209 0.649501 38.5433 1.0996L39.7131 3.4668C39.8013 3.64541 39.9717 3.76924 40.1688 3.79802L42.7845 4.17994C43.2816 4.25252 43.4797 4.86368 43.1196 5.21402L41.2287 7.05385C41.0855 7.19312 41.0202 7.39396 41.054 7.59079L41.5002 10.1899C41.5852 10.6849 41.0657 11.0626 40.6211 10.829L38.2819 9.60012C38.1054 9.50742 37.8946 9.50741 37.7181 9.60012L35.3789 10.829C34.9343 11.0626 34.4148 10.6849 34.4998 10.1899L34.946 7.59079C34.9798 7.39396 34.9145 7.19312 34.7713 7.05385L32.8804 5.21402C32.5203 4.86368 32.7184 4.25252 33.2155 4.17994L35.8312 3.79802C36.0283 3.76924 36.1987 3.64541 36.2869 3.4668L37.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M53.4567 1.0996C53.6791 0.649501 54.3209 0.649501 54.5433 1.0996L55.7131 3.4668C55.8013 3.64541 55.9717 3.76924 56.1688 3.79802L58.7845 4.17994C59.2816 4.25252 59.4797 4.86368 59.1196 5.21402L57.2287 7.05385C57.0855 7.19312 57.0202 7.39396 57.054 7.59079L57.5002 10.1899C57.5852 10.6849 57.0657 11.0626 56.6211 10.829L54.2819 9.60012C54.1054 9.50742 53.8946 9.50741 53.7181 9.60012L51.3789 10.829C50.9343 11.0626 50.4148 10.6849 50.4998 10.1899L50.946 7.59079C50.9798 7.39396 50.9145 7.19312 50.7713 7.05385L48.8804 5.21402C48.5203 4.86368 48.7184 4.25252 49.2155 4.17994L51.8312 3.79802C52.0283 3.76924 52.1987 3.64541 52.2869 3.4668L53.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M69.4567 1.0996C69.6791 0.649501 70.3209 0.649501 70.5433 1.0996L71.7131 3.4668C71.8013 3.64541 71.9717 3.76924 72.1688 3.79802L74.7845 4.17994C75.2816 4.25252 75.4797 4.86368 75.1196 5.21402L73.2287 7.05385C73.0855 7.19312 73.0202 7.39396 73.054 7.59079L73.5002 10.1899C73.5852 10.6849 73.0657 11.0626 72.6211 10.829L70.2819 9.60012C70.1054 9.50742 69.8946 9.50741 69.7181 9.60012L67.3789 10.829C66.9343 11.0626 66.4148 10.6849 66.4998 10.1899L66.946 7.59079C66.9798 7.39396 66.9145 7.19312 66.7713 7.05385L64.8804 5.21402C64.5203 4.86368 64.7184 4.25252 65.2155 4.17994L67.8312 3.79802C68.0283 3.76924 68.1987 3.64541 68.2869 3.4668L69.4567 1.0996Z" fill="#FFC107"/>
                        </svg>
                        <span style="color:#FFC107; margin-left:8px;">${tasker.averageRating}</span>
                    </div>
                </div>
            </div>
            <div class='tasker-mid'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M12 7.5L8.25 11.25L6.75 9.75" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.64314 1.42397C8.32453 0.525342 9.67547 0.525342 10.3569 1.42397L11.2079 2.5463C11.3938 2.79146 11.6975 2.91726 12.0023 2.87535L13.3976 2.6835C14.5149 2.52988 15.4701 3.48514 15.3165 4.60239L15.1247 5.99774C15.0827 6.30254 15.2085 6.60624 15.4537 6.79214L16.576 7.64314C17.4747 8.32453 17.4747 9.67547 16.576 10.3569L15.4537 11.2079C15.2085 11.3938 15.0827 11.6975 15.1247 12.0023L15.3165 13.3976C15.4701 14.5149 14.5149 15.4701 13.3976 15.3165L12.0023 15.1247C11.6975 15.0827 11.3938 15.2085 11.2079 15.4537L10.3569 16.576C9.67547 17.4747 8.32453 17.4747 7.64314 16.576L6.79214 15.4537C6.60624 15.2085 6.30254 15.0827 5.99774 15.1247L4.60238 15.3165C3.48514 15.4701 2.52988 14.5149 2.6835 13.3976L2.87535 12.0023C2.91726 11.6975 2.79146 11.3938 2.5463 11.2079L1.42397 10.3569C0.525342 9.67547 0.525342 8.32453 1.42397 7.64314L2.5463 6.79214C2.79146 6.60624 2.91726 6.30254 2.87535 5.99774L2.6835 4.60238C2.52988 3.48514 3.48514 2.52988 4.60239 2.6835L5.99774 2.87535C6.30254 2.91726 6.60624 2.79146 6.79214 2.5463L7.64314 1.42397Z" stroke="#5920BC" stroke-width="1.5"/>
                    </svg>
                    <p>${tasker.completedTasks} Tasks</p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M0.75 9C0.75 10.8358 0.849343 12.2598 1.09615 13.3703C1.34105 14.4723 1.72108 15.219 2.25102 15.749C2.78095 16.2789 3.52774 16.6589 4.62973 16.9039C5.74025 17.1507 7.16424 17.25 9 17.25C10.8358 17.25 12.2598 17.1507 13.3703 16.9039C14.4723 16.6589 15.219 16.2789 15.749 15.749C16.2789 15.219 16.6589 14.4723 16.9039 13.3703C17.1507 12.2598 17.25 10.8358 17.25 9C17.25 7.16424 17.1507 5.74025 16.9039 4.62974C16.6589 3.52774 16.2789 2.78095 15.749 2.25102C15.219 1.72108 14.4723 1.34105 13.3703 1.09615C12.2598 0.849342 10.8358 0.75 9 0.75C7.16424 0.75 5.74025 0.849342 4.62973 1.09615C3.52774 1.34105 2.78095 1.72108 2.25102 2.25102C1.72108 2.78095 1.34105 3.52774 1.09615 4.62973C0.849343 5.74025 0.75 7.16424 0.75 9Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 5.25V7.5M7.5 12.75V7.5M7.5 7.5H5.25H10.5M12.75 7.5H10.5M10.5 7.5V5.25V10.5M10.5 12.75V10.5M10.5 10.5H12.75H5.25" stroke="#5920BC" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Top Pro</p>
                </div>
                <div class='newpro'>
    
                </div>
            </div>
            <div class='tasker-bio'>
                <p>${tasker.bio}</p>
            </div>
            <button class='book'>Book Now</button>
        `;
        }
    
        else {
            div.innerHTML = `
            <div class='tasker-top'>
                <div class='imgcontainer'style='background-image:url(${profileimg.publicUrl}) '></div>
                <div class='tasker-info'>
                    <p>${tasker.user.name}</p>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="76" height="12" viewBox="0 0 76 12" fill="none">
                        <path d="M21.4567 1.0996C21.6791 0.649501 22.3209 0.649501 22.5433 1.0996L23.7131 3.4668C23.8013 3.64541 23.9717 3.76924 24.1688 3.79802L26.7845 4.17994C27.2816 4.25252 27.4797 4.86368 27.1196 5.21402L25.2287 7.05385C25.0855 7.19312 25.0202 7.39396 25.054 7.59079L25.5002 10.1899C25.5852 10.6849 25.0657 11.0626 24.6211 10.829L22.2819 9.60012C22.1054 9.50742 21.8946 9.50741 21.7181 9.60012L19.3789 10.829C18.9343 11.0626 18.4148 10.6849 18.4998 10.1899L18.946 7.59079C18.9798 7.39396 18.9145 7.19312 18.7713 7.05385L16.8804 5.21402C16.5203 4.86368 16.7184 4.25252 17.2155 4.17994L19.8312 3.79802C20.0283 3.76924 20.1987 3.64541 20.2869 3.4668L21.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M5.45665 1.0996C5.67906 0.649501 6.32094 0.649501 6.54335 1.0996L7.71305 3.4668C7.80131 3.64541 7.9717 3.76924 8.16883 3.79802L10.7845 4.17994C11.2816 4.25252 11.4797 4.86368 11.1196 5.21402L9.22867 7.05385C9.08553 7.19312 9.0202 7.39396 9.05399 7.59079L9.50024 10.1899C9.58523 10.6849 9.06572 11.0626 8.62106 10.829L6.28186 9.60012C6.10539 9.50742 5.89461 9.50741 5.71814 9.60012L3.37894 10.829C2.93428 11.0626 2.41477 10.6849 2.49976 10.1899L2.94601 7.59079C2.97981 7.39396 2.91447 7.19312 2.77133 7.05385L0.880399 5.21402C0.520326 4.86368 0.71836 4.25252 1.21548 4.17994L3.83117 3.79802C4.0283 3.76924 4.19869 3.64541 4.28695 3.4668L5.45665 1.0996Z" fill="#FFC107"/>
                        <path d="M37.4567 1.0996C37.6791 0.649501 38.3209 0.649501 38.5433 1.0996L39.7131 3.4668C39.8013 3.64541 39.9717 3.76924 40.1688 3.79802L42.7845 4.17994C43.2816 4.25252 43.4797 4.86368 43.1196 5.21402L41.2287 7.05385C41.0855 7.19312 41.0202 7.39396 41.054 7.59079L41.5002 10.1899C41.5852 10.6849 41.0657 11.0626 40.6211 10.829L38.2819 9.60012C38.1054 9.50742 37.8946 9.50741 37.7181 9.60012L35.3789 10.829C34.9343 11.0626 34.4148 10.6849 34.4998 10.1899L34.946 7.59079C34.9798 7.39396 34.9145 7.19312 34.7713 7.05385L32.8804 5.21402C32.5203 4.86368 32.7184 4.25252 33.2155 4.17994L35.8312 3.79802C36.0283 3.76924 36.1987 3.64541 36.2869 3.4668L37.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M53.4567 1.0996C53.6791 0.649501 54.3209 0.649501 54.5433 1.0996L55.7131 3.4668C55.8013 3.64541 55.9717 3.76924 56.1688 3.79802L58.7845 4.17994C59.2816 4.25252 59.4797 4.86368 59.1196 5.21402L57.2287 7.05385C57.0855 7.19312 57.0202 7.39396 57.054 7.59079L57.5002 10.1899C57.5852 10.6849 57.0657 11.0626 56.6211 10.829L54.2819 9.60012C54.1054 9.50742 53.8946 9.50741 53.7181 9.60012L51.3789 10.829C50.9343 11.0626 50.4148 10.6849 50.4998 10.1899L50.946 7.59079C50.9798 7.39396 50.9145 7.19312 50.7713 7.05385L48.8804 5.21402C48.5203 4.86368 48.7184 4.25252 49.2155 4.17994L51.8312 3.79802C52.0283 3.76924 52.1987 3.64541 52.2869 3.4668L53.4567 1.0996Z" fill="#FFC107"/>
                        <path d="M69.4567 1.0996C69.6791 0.649501 70.3209 0.649501 70.5433 1.0996L71.7131 3.4668C71.8013 3.64541 71.9717 3.76924 72.1688 3.79802L74.7845 4.17994C75.2816 4.25252 75.4797 4.86368 75.1196 5.21402L73.2287 7.05385C73.0855 7.19312 73.0202 7.39396 73.054 7.59079L73.5002 10.1899C73.5852 10.6849 73.0657 11.0626 72.6211 10.829L70.2819 9.60012C70.1054 9.50742 69.8946 9.50741 69.7181 9.60012L67.3789 10.829C66.9343 11.0626 66.4148 10.6849 66.4998 10.1899L66.946 7.59079C66.9798 7.39396 66.9145 7.19312 66.7713 7.05385L64.8804 5.21402C64.5203 4.86368 64.7184 4.25252 65.2155 4.17994L67.8312 3.79802C68.0283 3.76924 68.1987 3.64541 68.2869 3.4668L69.4567 1.0996Z" fill="#FFC107"/>
                        </svg>
                        <span style="color:#FFC107; margin-left:8px;">${tasker.averageRating}</span>
                    </div>
                </div>
            </div>
            <div class='tasker-mid'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M12 7.5L8.25 11.25L6.75 9.75" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.64314 1.42397C8.32453 0.525342 9.67547 0.525342 10.3569 1.42397L11.2079 2.5463C11.3938 2.79146 11.6975 2.91726 12.0023 2.87535L13.3976 2.6835C14.5149 2.52988 15.4701 3.48514 15.3165 4.60239L15.1247 5.99774C15.0827 6.30254 15.2085 6.60624 15.4537 6.79214L16.576 7.64314C17.4747 8.32453 17.4747 9.67547 16.576 10.3569L15.4537 11.2079C15.2085 11.3938 15.0827 11.6975 15.1247 12.0023L15.3165 13.3976C15.4701 14.5149 14.5149 15.4701 13.3976 15.3165L12.0023 15.1247C11.6975 15.0827 11.3938 15.2085 11.2079 15.4537L10.3569 16.576C9.67547 17.4747 8.32453 17.4747 7.64314 16.576L6.79214 15.4537C6.60624 15.2085 6.30254 15.0827 5.99774 15.1247L4.60238 15.3165C3.48514 15.4701 2.52988 14.5149 2.6835 13.3976L2.87535 12.0023C2.91726 11.6975 2.79146 11.3938 2.5463 11.2079L1.42397 10.3569C0.525342 9.67547 0.525342 8.32453 1.42397 7.64314L2.5463 6.79214C2.79146 6.60624 2.91726 6.30254 2.87535 5.99774L2.6835 4.60238C2.52988 3.48514 3.48514 2.52988 4.60239 2.6835L5.99774 2.87535C6.30254 2.91726 6.60624 2.79146 6.79214 2.5463L7.64314 1.42397Z" stroke="#5920BC" stroke-width="1.5"/>
                    </svg>
                    <p>${tasker.completedTasks} Tasks</p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M0.75 9C0.75 10.8358 0.849343 12.2598 1.09615 13.3703C1.34105 14.4723 1.72108 15.219 2.25102 15.749C2.78095 16.2789 3.52774 16.6589 4.62973 16.9039C5.74025 17.1507 7.16424 17.25 9 17.25C10.8358 17.25 12.2598 17.1507 13.3703 16.9039C14.4723 16.6589 15.219 16.2789 15.749 15.749C16.2789 15.219 16.6589 14.4723 16.9039 13.3703C17.1507 12.2598 17.25 10.8358 17.25 9C17.25 7.16424 17.1507 5.74025 16.9039 4.62974C16.6589 3.52774 16.2789 2.78095 15.749 2.25102C15.219 1.72108 14.4723 1.34105 13.3703 1.09615C12.2598 0.849342 10.8358 0.75 9 0.75C7.16424 0.75 5.74025 0.849342 4.62973 1.09615C3.52774 1.34105 2.78095 1.72108 2.25102 2.25102C1.72108 2.78095 1.34105 3.52774 1.09615 4.62973C0.849343 5.74025 0.75 7.16424 0.75 9Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 5.25V7.5M7.5 12.75V7.5M7.5 7.5H5.25H10.5M12.75 7.5H10.5M10.5 7.5V5.25V10.5M10.5 12.75V10.5M10.5 10.5H12.75H5.25" stroke="#5920BC" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Pro</p>
                </div>
                <div class='newpro'>
    
                </div>
            </div>
            <div class='tasker-bio'>
                <p>${tasker.bio}</p>
            </div>
            <button class='book'>Book Now</button>
        `;
        }
    
        taskersContainer.appendChild(div);
    });
    
    taskers.forEach(tasker=>{
        if (isNewPro(tasker)) {
            document.querySelector('.newpro').innerHTML =`
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
            <path d="M5.7 0.75C6.96779 0.75 8.12425 1.38106 9 2.1C9.87575 1.38106 11.0322 0.75 12.3 0.75C15.0338 0.75 17.25 2.78287 17.25 5.29039C17.25 10.3462 11.4956 13.2908 9.59855 14.1241C9.21644 14.292 8.78356 14.292 8.40146 14.1241C6.50444 13.2907 0.75 10.3461 0.75 5.29027C0.75 2.78275 2.96619 0.75 5.7 0.75Z" stroke="#5920BC" stroke-width="1.5"/>
            </svg>
            <p>New Pro</p>
            `;
        }
    });
};

allTaskers(taskers);

topProContainer.addEventListener('click',()=>{
    if (!isCheckedTopPro) {
        topProContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0405 8.20711C14.431 7.81658 14.431 7.18342 14.0405 6.79289C13.65 6.40237 13.0168 6.40237 12.6263 6.79289L9.16671 10.2525L7.79048 8.87623C7.39996 8.4857 6.76679 8.4857 6.37627 8.87623C5.98574 9.26675 5.98574 9.89992 6.37627 10.2904L8.4596 12.3738C8.50842 12.4226 8.56102 12.4653 8.61647 12.5019C9.00462 12.7582 9.53211 12.7155 9.87381 12.3738L14.0405 8.20711Z" fill="#5920BC"/>
            <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Top Pros</p>
         `;
        isCheckedTopPro = true;
        taskersContainer.innerHTML = " ";
        filteredAppearance();
    }
    else{
        topProContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="topProIcon">
                        <g opacity="0.5">
                          <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
        <p>Top Pros</p>
        `;
        isCheckedTopPro = false;
        taskersContainer.innerHTML = " ";
        if (necessaryCondition())  filteredAppearance();
        else allTaskers(taskers);
    }

});

newProContainer.addEventListener('click',()=>{
    if (!isCheckedNewPro) {
        newProContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0405 8.20711C14.431 7.81658 14.431 7.18342 14.0405 6.79289C13.65 6.40237 13.0168 6.40237 12.6263 6.79289L9.16671 10.2525L7.79048 8.87623C7.39996 8.4857 6.76679 8.4857 6.37627 8.87623C5.98574 9.26675 5.98574 9.89992 6.37627 10.2904L8.4596 12.3738C8.50842 12.4226 8.56102 12.4653 8.61647 12.5019C9.00462 12.7582 9.53211 12.7155 9.87381 12.3738L14.0405 8.20711Z" fill="#5920BC"/>
            <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>New Pros</p>
         `;
        isCheckedNewPro = true;
        taskersContainer.innerHTML = " ";
        filteredAppearance();
    }
    else{
        newProContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="topProIcon">
                        <g opacity="0.5">
                          <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
        <p>New Pros</p>
        `;
        isCheckedNewPro = false;
        taskersContainer.innerHTML = " ";
        if (necessaryCondition())  filteredAppearance();
        else allTaskers(taskers);
    }
});

supervisorContainer.addEventListener('click',()=>{
    if (!isCheckedSupervisor) {
        supervisorContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0405 8.20711C14.431 7.81658 14.431 7.18342 14.0405 6.79289C13.65 6.40237 13.0168 6.40237 12.6263 6.79289L9.16671 10.2525L7.79048 8.87623C7.39996 8.4857 6.76679 8.4857 6.37627 8.87623C5.98574 9.26675 5.98574 9.89992 6.37627 10.2904L8.4596 12.3738C8.50842 12.4226 8.56102 12.4653 8.61647 12.5019C9.00462 12.7582 9.53211 12.7155 9.87381 12.3738L14.0405 8.20711Z" fill="#5920BC"/>
            <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Supervisors</p>
         `;
        isCheckedSupervisor = true;
        taskersContainer.innerHTML = " ";
        filteredAppearance();
    }
    else{
        supervisorContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="topProIcon">
                        <g opacity="0.5">
                          <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
        <p>Supervisors</p>
        `;
        isCheckedSupervisor = false;
        taskersContainer.innerHTML = " ";
        if (necessaryCondition())  filteredAppearance();
        else allTaskers(taskers);
    }
});

proContainer.addEventListener('click',()=>{
    if (!isCheckedPro) {
        proContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0405 8.20711C14.431 7.81658 14.431 7.18342 14.0405 6.79289C13.65 6.40237 13.0168 6.40237 12.6263 6.79289L9.16671 10.2525L7.79048 8.87623C7.39996 8.4857 6.76679 8.4857 6.37627 8.87623C5.98574 9.26675 5.98574 9.89992 6.37627 10.2904L8.4596 12.3738C8.50842 12.4226 8.56102 12.4653 8.61647 12.5019C9.00462 12.7582 9.53211 12.7155 9.87381 12.3738L14.0405 8.20711Z" fill="#5920BC"/>
            <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Pros</p>
         `;
        isCheckedPro = true;
        taskersContainer.innerHTML = " ";
        filteredAppearance();
    }
    else{
        proContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="topProIcon">
                        <g opacity="0.5">
                          <path d="M0.75 10C0.75 12.0416 0.860374 13.6311 1.13659 14.8739C1.41091 16.1083 1.83874 16.9543 2.44221 17.5578C3.04567 18.1613 3.89172 18.5891 5.12607 18.8634C6.36893 19.1396 7.95837 19.25 10 19.25C12.0416 19.25 13.6311 19.1396 14.8739 18.8634C16.1083 18.5891 16.9543 18.1613 17.5578 17.5578C18.1613 16.9543 18.5891 16.1083 18.8634 14.8739C19.1396 13.6311 19.25 12.0416 19.25 10C19.25 7.95837 19.1396 6.36893 18.8634 5.12607C18.5891 3.89173 18.1613 3.04567 17.5578 2.44221C16.9543 1.83874 16.1083 1.41091 14.8739 1.13659C13.6311 0.860374 12.0416 0.75 10 0.75C7.95837 0.75 6.36893 0.860374 5.12607 1.13659C3.89172 1.41091 3.04567 1.83874 2.44221 2.44221C1.83874 3.04567 1.41091 3.89173 1.13659 5.12607C0.860374 6.36893 0.75 7.95837 0.75 10Z" stroke="#5920BC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
        <p>Pros</p>
        `;
        isCheckedPro = false;
        taskersContainer.innerHTML = " ";
        if (necessaryCondition())  filteredAppearance();
        else allTaskers(taskers);
    }
});

function necessaryCondition() {
    return (isCheckedNewPro || isCheckedPro || isCheckedSupervisor || isCheckedTopPro);
}

function filteredAppearance() {
  taskersContainer.innerHTML = " ";
    let taskers = [];
    if (isCheckedNewPro) Array.prototype.push.apply(taskers, newTop);
    if (isCheckedPro) Array.prototype.push.apply(taskers, pro);
    if (isCheckedSupervisor) Array.prototype.push.apply(taskers, superVisor);
    if (isCheckedTopPro) Array.prototype.push.apply(taskers, topPro);
    if (taskers.length === 0) taskers = data.data.taskers;
    taskers = checkboxFilter(taskers)
    const filteredTaskers = [... new Set(taskers)];
    allTaskers(filteredTaskers);
}

selectedRating.addEventListener('change',filteredAppearance);
selectedCount.addEventListener('change',filteredAppearance);