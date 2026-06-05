import os
import sys

# Try to import reportlab. If not present, install it.
try:
    import reportlab
except ImportError:
    import subprocess
    print("Installing reportlab library...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_resume(filename):
    # Setup document geometry (0.5 inch margins = 36 points)
    doc = SimpleDocTemplate(filename, pagesize=letter,
                            rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    story = []
    styles = getSampleStyleSheet()
    
    # Color palette (Red & Dark Slate)
    primary_color = colors.HexColor("#b70918") # Secondary/primary red
    text_color = colors.HexColor("#0f172a") # Dark slate
    dim_color = colors.HexColor("#475569") # Slate gray
    
    # Custom Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=primary_color,
        alignment=1 # Centered
    )
    
    sub_title_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=dim_color,
        alignment=1 # Centered
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4,
        borderColor=primary_color,
        borderWidth=0.5,
        borderPadding=(0, 0, 1, 0)
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=text_color
    )
    
    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-8,
        spaceBefore=1,
        spaceAfter=1
    )

    # 1. Header (Centered Contact Info)
    story.append(Paragraph("SRIKAVINESH M", title_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Coimbatore, Tamil Nadu | srikavinesh.m2024ece@sece.ac.in | +91 7397157443 | github.com/sri-067", sub_title_style))
    story.append(Spacer(1, 10))
    
    # 2. Education Section
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(Paragraph("<b>B.E. Electronics and Communication Engineering</b> (CGPA: 7.1)", body_bold))
    story.append(Paragraph("Sri Eshwar College of Engineering, Coimbatore | 2022 - 2026", body_style))
    story.append(Spacer(1, 6))
    
    # 3. Experience & Internships
    story.append(Paragraph("EXPERIENCE & INTERNSHIPS", section_heading))
    
    story.append(Paragraph("<b>Digital Twin Intern</b> | Praya Labs", body_bold))
    story.append(Paragraph("<i>Jan 2026 - Present | Coimbatore, IN</i>", ParagraphStyle('ItalicSub', parent=body_style, fontName='Helvetica-Oblique', textColor=dim_color)))
    story.append(Paragraph("&bull; Developed interactive 3D digital twin models and simulations using Unity and Blender for IoT ecosystems and industrial controls.", bullet_style))
    story.append(Paragraph("&bull; Integrated sensor telemetries to sync physical devices with real-time virtual spatial interfaces.", bullet_style))
    story.append(Spacer(1, 5))
    
    story.append(Paragraph("<b>AR/VR Developer Intern</b> | Fusion VR", body_bold))
    story.append(Paragraph("<i>Jan 2026 - Present | Coimbatore, IN</i>", ParagraphStyle('ItalicSub2', parent=body_style, fontName='Helvetica-Oblique', textColor=dim_color)))
    story.append(Paragraph("&bull; Designed immersive virtual reality environments, styled 3D environmental assets using Blender, and coded spatial interactions in Unity.", bullet_style))
    story.append(Paragraph("&bull; Built low-latency Standalone VR pipelines using Unity and C#.", bullet_style))
    story.append(Spacer(1, 6))
    
    # 4. Selected Projects
    story.append(Paragraph("SELECTED PROJECTS", section_heading))
    
    story.append(Paragraph("<b>Healthcare Portal</b> | MERN Stack, MongoDB, Express, React, Node.js", body_bold))
    story.append(Paragraph("&bull; Developed telehealth portal enabling patients and medical personnel to manage records and track live vitals telemetry dashboards.", bullet_style))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>Student ID QR</b> | React, Node.js, Express, MongoDB, QR Codes", body_bold))
    story.append(Paragraph("&bull; Created a visitor and student scanner check-in logging system using instant QR codes and MERN dashboards.", bullet_style))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>Lost & Found</b> | React, Firebase, GeoMap APIs", body_bold))
    story.append(Paragraph("&bull; Developed community map reporter allowing students to pin and catalog lost campus objects.", bullet_style))
    story.append(Spacer(1, 6))
    
    # 5. Skills Section
    story.append(Paragraph("TECHNICAL ARSENAL", section_heading))
    story.append(Paragraph("<b>Frontend & UX:</b> React, Next.js, HTML5, CSS3, TailwindCSS, JavaScript", body_style))
    story.append(Paragraph("<b>Backend & IoT:</b> Node.js, Express, MongoDB, Firebase, MySQL, IoT telemetries", body_style))
    story.append(Paragraph("<b>3D/XR & Tools:</b> Unity, Blender, C#, Python, Java, Git, GitHub", body_style))
    story.append(Spacer(1, 6))
    
    # 6. Achievements
    story.append(Paragraph("ACHIEVEMENTS", section_heading))
    story.append(Paragraph("&bull; <b>2nd Place / Createathon '24</b> | Web hackathon runner-up at Sri Eshwar College of Engineering.", bullet_style))
    story.append(Paragraph("&bull; <b>VIT Mauritius Tech-Ideathon 2026</b> | Active participant representing IoT design systems.", bullet_style))
    
    # Compile PDF
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc.build(story)

if __name__ == "__main__":
    generate_resume("assets/resume.pdf")
    print("Resume PDF generated successfully!")
