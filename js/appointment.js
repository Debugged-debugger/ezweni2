// Appointment scheduling functionality
document.addEventListener('DOMContentLoaded', function() {
    initAppointmentForm();
    initCalendar();
    initAppointmentOptions();
});

let selectedDate = null;
let selectedTime = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    // Next step functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            navigateToStep(nextStep);
        });
    });
    
    // Previous step functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            navigateToStep(prevStep);
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitAppointment();
    });
    
    // Service type change
    document.getElementById('serviceType').addEventListener('change', updateAppointmentSummary);
    document.getElementById('appointmentType').addEventListener('change', updateAppointmentSummary);
}

function navigateToStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    document.getElementById(stepId).classList.add('active');
    
    // Update appointment summary when going to step 3
    if (stepId === 'step3') {
        updateAppointmentSummary();
    }
}

function initAppointmentOptions() {
    const options = document.querySelectorAll('.appointment-option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update appointment type select
            const type = this.getAttribute('data-type');
            document.getElementById('appointmentType').value = type;
            
            // Update appointment summary
            updateAppointmentSummary();
        });
    });
}

function initCalendar() {
    generateCalendar(currentMonth, currentYear);
    
    // Month navigation
    document.getElementById('prevMonth').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
}

function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Update month header
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Clear calendar
    calendar.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day header';
        dayElement.textContent = day;
        dayElement.style.fontWeight = 'bold';
        dayElement.style.color = 'var(--primary-green)';
        calendar.appendChild(dayElement);
    });
    
    // Get first day of month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendar.appendChild(emptyDay);
    }
    
    // Add days of month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const currentDate = new Date(year, month, day);
        
        // Disable past dates
        if (currentDate < today) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.addEventListener('click', function() {
                selectDate(day, month, year);
            });
        }
        
        // Highlight today
        if (currentDate.getTime() === today.getTime()) {
            dayElement.style.backgroundColor = 'var(--accent-gold)';
            dayElement.style.color = 'white';
        }
        
        calendar.appendChild(dayElement);
    }
}

function selectDate(day, month, year) {
    selectedDate = new Date(year, month, day);
    
    // Remove selected class from all days
    document.querySelectorAll('.calendar-day').forEach(dayEl => {
        dayEl.classList.remove('selected');
    });
    
    // Add selected class to clicked day
    const days = document.querySelectorAll('.calendar-day');
    const selectedIndex = day + new Date(year, month, 1).getDay() - 1;
    days[selectedIndex + 7].classList.add('selected'); // +7 for day headers
    
    // Show time selection
    document.getElementById('timeSelection').style.display = 'block';
    generateTimeSlots();
    
    // Update appointment summary
    updateAppointmentSummary();
}

function generateTimeSlots() {
    const timeSlots = document.getElementById('timeSlots');
    timeSlots.innerHTML = '';
    
    const appointmentType = document.getElementById('appointmentType').value;
    let availableSlots = [];
    
    // Generate time slots based on appointment type
    if (appointmentType === 'emergency') {
        availableSlots = [
            'Immediate', 'ASAP', 'Urgent'
        ];
    } else {
        // Regular time slots
        availableSlots = [
            '09:00 AM', '10:00 AM', '11:00 AM', 
            '02:00 PM', '03:00 PM', '04:00 PM'
        ];
        
        // Add more slots for virtual appointments
        if (appointmentType === 'virtual') {
            availableSlots.push('05:00 PM', '06:00 PM', '07:00 PM');
        }
    }
    
    availableSlots.forEach(slot => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = slot;
        timeSlot.addEventListener('click', function() {
            selectTime(slot);
        });
        timeSlots.appendChild(timeSlot);
    });
}

function selectTime(time) {
    selectedTime = time;
    
    // Remove selected class from all time slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selected class to clicked time slot
    document.querySelectorAll('.time-slot').forEach(slot => {
        if (slot.textContent === time) {
            slot.classList.add('selected');
        }
    });
    
    // Enable continue button
    document.getElementById('continueToDetails').disabled = false;
    
    // Update appointment summary
    updateAppointmentSummary();
}

function updateAppointmentSummary() {
    const serviceType = document.getElementById('serviceType').value;
    const appointmentType = document.getElementById('appointmentType').value;
    
    let summaryHTML = '<h4 style="color: var(--primary-green); margin-bottom: 15px;">Appointment Summary</h4>';
    
    // Service type
    if (serviceType) {
        const serviceText = {
            'pre-planning': 'Pre-Planning Consultation',
            'immediate': 'Immediate Funeral Arrangements',
            'grief-support': 'Grief Support Session',
            'general': 'General Inquiry',
            'monument': 'Monument Services',
            'transport': 'Transportation Services'
        }[serviceType];
        summaryHTML += `<p><strong>Service:</strong> ${serviceText}</p>`;
    }
    
    // Appointment type
    if (appointmentType) {
        const typeText = {
            'in-person': 'In-Person Visit',
            'virtual': 'Virtual Meeting',
            'emergency': 'Emergency Arrangements'
        }[appointmentType];
        summaryHTML += `<p><strong>Type:</strong> ${typeText}</p>`;
    }
    
    // Date and time
    if (selectedDate) {
        const dateString = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        summaryHTML += `<p><strong>Date:</strong> ${dateString}</p>`;
    }
    
    if (selectedTime) {
        summaryHTML += `<p><strong>Time:</strong> ${selectedTime}</p>`;
    }
    
    document.getElementById('appointmentSummary').innerHTML = summaryHTML;
}

function submitAppointment() {
    const formData = {
        serviceType: document.getElementById('serviceType').value,
        appointmentType: document.getElementById('appointmentType').value,
        date: selectedDate ? selectedDate.toLocaleDateString() : '',
        time: selectedTime || '',
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        preferredContact: document.getElementById('preferredContact').value,
        additionalInfo: document.getElementById('additionalInfo').value
    };
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!selectedDate || !selectedTime) {
        alert('Please select a date and time for your appointment.');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Show confirmation
        showConfirmation(formData);
        
        // Here you would typically send the data to your server
        console.log('Appointment data:', formData);
        
        // You can integrate with:
        // - Google Calendar API
        // - Email service (SendGrid, Mailgun)
        // - CRM system
        // - Database storage
    }, 1000);
}

function showConfirmation(formData) {
    // Navigate to confirmation step
    navigateToStep('step4');
    
    // Format confirmation details
    const serviceText = {
        'pre-planning': 'Pre-Planning Consultation',
        'immediate': 'Immediate Funeral Arrangements',
        'grief-support': 'Grief Support Session',
        'general': 'General Inquiry',
        'monument': 'Monument Services',
        'transport': 'Transportation Services'
    }[formData.serviceType];
    
    const typeText = {
        'in-person': 'In-Person Visit',
        'virtual': 'Virtual Meeting',
        'emergency': 'Emergency Arrangements'
    }[formData.appointmentType];
    
    const dateString = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const confirmationHTML = `
        <p><strong>Service:</strong> ${serviceText}</p>
        <p><strong>Appointment Type:</strong> ${typeText}</p>
        <p><strong>Date:</strong> ${dateString}</p>
        <p><strong>Time:</strong> ${formData.time}</p>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        ${formData.additionalInfo ? `<p><strong>Additional Info:</strong> ${formData.additionalInfo}</p>` : ''}
    `;
    
    document.getElementById('confirmationDetails').innerHTML = confirmationHTML;
    
    // Send confirmation email (simulated)
    sendConfirmationEmail(formData);
}

function sendConfirmationEmail(formData) {
    // In a real implementation, you would:
    // 1. Send email to the client
    // 2. Send notification to your team
    // 3. Add to your calendar system
    
    console.log('Confirmation email would be sent to:', formData.email);
    console.log('Team notification would be sent');
    
    // Example integration with email service:
    /*
    fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
    */
}

// Calendar availability management
function isDateAvailable(date) {
    // In a real implementation, you would check against:
    // - Existing appointments in your database
    // - Business hours
    // - Staff availability
    // - Holiday schedules
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (date < today) {
        return false;
    }
    
    // Example: Disable Sundays
    if (date.getDay() === 0) {
        return false;
    }
    
    return true;
}

// Export functions for potential integration
window.scheduleAppointment = {
    init: initAppointmentForm,
    submit: submitAppointment,
    updateSummary: updateAppointmentSummary
};