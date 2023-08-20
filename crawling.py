#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 22 13:12:09 2023

@author: kusnick
"""

import pandas as pd
import json

# Load the xlsx file
excel_data = pd.read_excel('Visual Storytelling in DH&CH.xlsx', None)

coded_examples = excel_data['Coding']

converted = []

attributes = ['Type','Name/Title','Traceability','Link','Venue','Format/Published in','Description','Authoring Tool','Abstract','Authors','Main Topics','DH','CH', 'Image', 'Bibtex']

rows = {"upper": ['Media Types',
'Visualization Types',
'Story Thread',
'Visualization-text Linking',
'VBS Composition',
'Interactive Implementation',
'Target Devices'],
"lower": [
    'Entity-orientation',
'Story Complexity',
'Story Schemata',
'Plot Patterns',
'Story Arc & Hook',
'Linearity',
'Factuality',
'Other'
]}

dimensions = {
'Media Types': 
    ['Audio',
    'Text',    
    'Images',  
    'Film',    
    'Visualization'],
'Visualization Types': 
    ['Timeline', 
    'Map',  
    'Set',  
    'Graph',    
    'Chart',    
    'Rendering',    
    'Interaction',],
'Story Thread': 
    ['Text',
    'Speech',
    'Juxtaposition',
    'Temporal Succession',
    'Moving Camera'],
'Visualization-text Linking': 
    ['In-text References','Visualization Legend','Visualization Annotations','Coordinated Scrolling'],
'VBS Composition':
    ['Rich Media Without Visualization','Timeline Visualization','Multi-timeline Visualization','Narrative Pathway','Mixed Pathway & Exploration', 'Stories With Multiple Visualizations','Pathways Through Multiple Visualizations'],
'Interactive Implementation':
    ['Annotated Chart','Data Comic','Scrollytelling','Animation','Slideshow','Moving Camera','Slideshow + Moving Camera'],
'Target Devices': 
    ['Static Display','Desktop / Touchscreen','Mobile Device','Large Display / Wall','Multi-touch / Table','Virtual Reality','Augmented / Mixed Reality'],
'Entity-orientation':
    ['Objects','Persons', 'Sets', 'Events', 'Places'],
'Story Complexity': 
    ['Synchronic: Simple','Synchronic: Medium','Synchronic: Complex','Diachronic: Simple','Diachronic: Medium','Diachronic: Complex',],
'Story Schemata':
    ['Actor Biography','Object Biography','Place Biography','Hybrid Biography','Biography Sequences','Biography Bundles','Inverted Trees','Trees','Larger Topic / Era','Larger Topic / Multi-era',],
'Plot Patterns':
    ['Genesis Plot','Emergence Plot','Destruction Plot','Metamorphosis Plot','Cause & Effect','Convergence','Divergence','Oscillation'],
'Story Arc & Hook':
    ['Set-up','Rising Conflict / Supporting Facts','Climax / Main Insight','Resolution / Conclusion','Story Hook',],
'Linearity':
    ['Linear Storytelling','Non-linear Storytellig'],
'Factuality':
    ['Factuality','Uncertainty', 'Fictitious Elements', 'Fictitious Story World'],
'Other':
    ['Gamification Elements']
}

groupedDimensions = [
'Media Types:Audio',
'Media Types:Text',
'Media Types:Images',
'Media Types:Film',
'Media Types:Visualization',
'Visualization Types:Timeline',
'Visualization Types:Map',
'Visualization Types:Set',
'Visualization Types:Graph',
'Visualization Types:Chart',
'Visualization Types:Rendering',
'Visualization Types:Interaction',
'Story Thread:Text',
'Story Thread:Speech',
'Story Thread:Juxtaposition',
'Story Thread:Temporal Succession',
'Story Thread:Moving Camera',
'Visualization-text Linking:In-text References',
'Visualization-text Linking:Visualization Legend',
'Visualization-text Linking:Visualization Annotations',
'Visualization-text Linking:Coordinated Scrolling',
'VBS Composition:Rich Media Without Visualization',
'VBS Composition:Timeline Visualization',
'VBS Composition:Multi-timeline Visualization',
'VBS Composition:Narrative Pathway',
'VBS Composition:Mixed Pathway & Exploration',
'VBS Composition:Stories With Multiple Visualizations',
'VBS Composition:Pathways Through Multiple Visualizations',
'Interactive Implementation:Annotated Chart',
'Interactive Implementation:Data Comic',
'Interactive Implementation:Scrollytelling',
'Interactive Implementation:Animation',
'Interactive Implementation:Slideshow',
'Interactive Implementation:Moving Camera',
'Interactive Implementation:Slideshow + Moving Camera',
'Target Devices:Static Display',
'Target Devices:Desktop / Touchscreen',
'Target Devices:Mobile Device',
'Target Devices:Large Display / Wall',
'Target Devices:Multi-touch / Table',
'Target Devices:Virtual Reality',
'Target Devices:Augmented / Mixed Reality',
'Entity-orientation:Objects',
'Entity-orientation:Persons',
'Entity-orientation:Sets',
'Entity-orientation:Events',
'Entity-orientation:Places',
'Story Complexity:Synchronic: Simple',
'Story Complexity:Synchronic: Medium',
'Story Complexity:Synchronic: Complex',
'Story Complexity:Diachronic: Simple',
'Story Complexity:Diachronic: Medium',
'Story Complexity:Diachronic: Complex',
'Story Schemata:Actor Biography',
'Story Schemata:Object Biography',
'Story Schemata:Place Biography',
'Story Schemata:Hybrid Biography',
'Story Schemata:Biography Sequences',
'Story Schemata:Biography Bundles',
'Story Schemata:Inverted Trees',
'Story Schemata:Trees',
'Story Schemata:Larger Topic / Era',
'Story Schemata:Larger Topic / Multi-era',
'Plot Patterns:Genesis Plot',
'Plot Patterns:Emergence Plot',
'Plot Patterns:Destruction Plot',
'Plot Patterns:Metamorphosis Plot',
'Plot Patterns:Cause & Effect',
'Plot Patterns:Convergence',
'Plot Patterns:Divergence',
'Plot Patterns:Oscillation',
'Story Arc & Hook:Set-up',
'Story Arc & Hook:Rising Conflict / Supporting Facts',
'Story Arc & Hook:Climax / Main Insight',
'Story Arc & Hook:Resolution / Conclusion',
'Story Arc & Hook:Story Hook',
'Linearity:Linear Storytelling',
'Linearity:Non-linear Storytellig',
'Factuality:Factuality',
'Factuality:Uncertainty',
'Factuality:Fictitious Elements',
'Factuality:Fictitious Story World',
'Other:Gamification Elements'
]

reverseDimensions = {}

upperRowString = ""
lowerRowString = ""

for group in dimensions:
    for dim in dimensions[group]:
        reverseDimensions[dim] = group

for idx, coded in coded_examples.iterrows():

    newEntry =  {}

    for dim in dimensions:
        newEntry[dim] = []

    for key in coded.keys():
        if key in attributes:
            newEntry[key] = coded[key]
        else:
            try:
                splitted = key.split(":")
                group = splitted[0]
                cat = ":".join(splitted[1:])
                if type(coded[key]) == str and coded[key].strip().lower() == 'x':
                    try:
                        newEntry[group].append(cat)
                    except:
                        newEntry[group] = [cat]
            except:
                pass

    converted.append(newEntry)


convertedFile = open('./converted.json', "w")
convertedFile.write(json.dumps(converted, indent=2).replace('NaN', 'null').replace('nan', 'null'))
convertedFile.close()


for idx, coded in coded_examples.iterrows():
    upperRowString = upperRowString + "\\"
    upperRowString = upperRowString + "hspace{0.5mm} "
    upperRowString = upperRowString + (coded["Name/Title"][:30] + "..." if len(coded["Name/Title"]) > 30 else coded["Name/Title"])
    upperRowString = upperRowString + " \\cite{"
    upperRowString = upperRowString + str(coded["Bibtex"])
    upperRowString = upperRowString + "} &\n"

    for dim in rows["upper"]:
        upperRowString = upperRowString + f'\t% {dim}\n\t'

        for cat in dimensions[dim]:
            key = dim + ":" + cat
            if type(coded[key]) == str and coded[key].strip().lower() == 'x':
                upperRowString = upperRowString + f'\\checkmarkicon & '
            else:
                upperRowString = upperRowString + f' & '

        upperRowString = upperRowString + f'\n'

    old_idx = upperRowString.rfind("&")
    upperRowString = upperRowString[:old_idx] + "\\\\" + upperRowString[old_idx+len("&"):]

convertedFile = open('./upperRowTable.txt', "w")
convertedFile.write(upperRowString)
convertedFile.close()

for idx, coded in coded_examples.iterrows():
    lowerRowString = lowerRowString + "\\"
    lowerRowString = lowerRowString + "hspace{0.5mm} "
    lowerRowString = lowerRowString + (coded["Name/Title"][:30] + "..." if len(coded["Name/Title"]) > 30 else coded["Name/Title"])
    lowerRowString = lowerRowString + " \\cite{"
    lowerRowString = lowerRowString + str(coded["Bibtex"])
    lowerRowString = lowerRowString + "} &\n"

    for dim in rows["lower"]:
        lowerRowString = lowerRowString + f'\t% {dim}\n\t'

        for cat in dimensions[dim]:
            key = dim + ":" + cat
            if type(coded[key]) == str and coded[key].strip().lower() == 'x':
                lowerRowString = lowerRowString + f'\\checkmarkicon & '
            else:
                lowerRowString = lowerRowString + f' & '

        lowerRowString = lowerRowString + f'\n'

    old_idx = lowerRowString.rfind("&")
    lowerRowString = lowerRowString[:old_idx] + "\\\\" + lowerRowString[old_idx+len("&"):]

convertedFile = open('./lowerRowTable.txt', "w")
convertedFile.write(lowerRowString)
convertedFile.close()
