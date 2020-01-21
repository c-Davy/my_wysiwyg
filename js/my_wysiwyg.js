
/*
** Adds a plugin to jQuery as an anonymous function
** Requires a textarea with class 'wysiwyg-frame' and
**		and a div with class 'wysiwyg-frame wysiwyg-frame--hidden'
**		to switch views
**
** @var object (object): an object containing properties
**		As for now, following properties are handled:
**		buttons: a list of buttons to display on the editor
**			Valid buttons are :
**				save: to save the document
**				switch: to switch views
**				size: to changed highlighted text's size
**				thinner: to lower the font-weight of the highlighted text
**				thicker: to increase the font-weight of the highlighted text
**				bold: to make the highlighted text be a button
**				italic: to make the highlighted text be italic
**				strike: to make the highlighted text lined-through
**				color: to change highlighted text's color
**				left: to align highlighted text to the left
**				center: to center the highlighted text
**				right: to align highlighted text to the right
**				justify: to justify highlighted text
**				link: to make the highlighted text be a link
**				image: to put an image
**				video; to display a video
*/
$.fn.my_wysiwyg = function (object)
{
	// On parcourt l'ensemble des textarea
	this.each((index, tag) =>
	{
		/******************* Configuration block *******************/
		// Si le plugin a pas reçu de liste de boutons, on met ceux par défaut
		if (! object.hasOwnProperty('buttons'))
		{
			object.buttons = ['bold', 'italic', 'strike', 'switch'];
		}
		/******************* End of configuration block *******************/




		/******************* Functions block *******************/
		/*
		** Callbacks for buttons
		**
		** @var beforeHighlighted (string): what's before the highlighted text
		** @var highlighted (string): the highlighted text
		** @var afterHighlighted (string): what's after the highlighted text
		** @var cursorPosition (int) : the position of the cursor (before highlighted text)
		*/
		let callbacks =
		{
			image: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				let inner = $('div.wysiwyg-frame').html();
				let image = prompt('url picture');
				if (image!== null && image !== '')
				{
					tag.value = beforeHighlighted + '<img src ="' + image + '">' + afterHighlighted;
				}
			},
			switch: () =>
			{
				$('.wysiwyg-frame').each((index, frame) =>
				{
					$(frame).toggleClass('wysiwyg-frame--hidden');
				});
			},
			justify: () =>
			{
				let content = surroundingTag();
				if (content)
				{
					tag.value = content.content.before + '<div align="justify">' + content.content.surrounding_text + '</div>' + content.content.after;
				}
			},
			left: () =>
			{
				let content = surroundingTag();
				if (content)
				{
					tag.value = content.content.before + '<div align="left">' + content.content.surrounding_text + '</div>' + content.content.after;
				}
			},
			center: () =>
			{
				let content = surroundingTag();
				if (content)
				{
					tag.value = content.content.before + '<div align="center">' + content.content.surrounding_text + '</div>' + content.content.after;
				}
			},
			right: () =>
			{
				let content = surroundingTag();
				if (content)
				{
					tag.value = content.content.before + '<div align="right">' + content.content.surrounding_text + '</div>' + content.content.after;
				}
			},
			color: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				let $palette = $('.toolbar-palette');
				if ($palette.css('display') === 'none')
				{
						$palette.css('display', 'flex');
				}
				else
				{
						$palette.css('display', 'none');
				}
				$('.toolbar-color-red').click(function () {
					tag.value = beforeHighlighted + '<font color="red">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-color-orange').click(function () {
					tag.value = beforeHighlighted + '<font color="orange">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-color-yellow').click(function () {
					tag.value = beforeHighlighted + '<font color="yellow">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-color-green').click(function () {
					tag.value = beforeHighlighted + '<font color="green">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-color-blue').click(function () {
					tag.value = beforeHighlighted + '<font color="blue">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-color-purple').click(function () {
					tag.value = beforeHighlighted + '<font color="purple">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-color-pink').click(function () {
					tag.value = beforeHighlighted + '<font color="pink">' + highlighted + '</font>' + afterHighlighted;
				});
			},
			size: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				let $size = $('.toolbar-size');
				if ($size.css('display') === 'none')
				{
						$size.css('display', 'flex');
				}
				else
				{
						$size.css('display', 'none');
				}
				$('.toolbar-11').click(function () {
					tag.value = beforeHighlighted + '<font size="11">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-12').click(function () {
					tag.value = beforeHighlighted + '<font size="12">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-14').click(function () {
					tag.value = beforeHighlighted + '<font size="14">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-16').click(function () {
					tag.value = beforeHighlighted + '<font size="16">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-20').click(function () {
					tag.value = beforeHighlighted + '<font size="20">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-24').click(function () {
					tag.value = beforeHighlighted + '<font size="24">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-36').click(function () {
					tag.value = beforeHighlighted + '<font size="36">' + highlighted + '</font>' + afterHighlighted;
				});
				$('.toolbar-48').click(function () {
					tag.value = beforeHighlighted + '<font size="48">' + highlighted + '</font>' + afterHighlighted;
				});
			},
			thinner: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				if (highlighted !== '')
				{
					tag.value = beforeHighlighted + '<span style="font-weight: lighter">' + highlighted + '</span>' + afterHighlighted;
				}
			},
			thicker: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				if (highlighted !== '')
				{
					tag.value = beforeHighlighted + '<span style="font-weight: bolder">' + highlighted + '</span>' + afterHighlighted;
				}
			},
			link: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				if (highlighted !== '')
				{
					let href = prompt('Enter a link : ');
					if (href !== null)
					{
						href = href.replace('http://', '');
						tag.value = beforeHighlighted + '<a href="http://' + href + '">' + highlighted + '</a>' + afterHighlighted;
					}
				}
			},
			/*
			** Makes the highlighted text be bold
			*/
			bold: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				if (highlighted !== '')
				{
					tag.value = beforeHighlighted + '<strong>' + highlighted + '</strong>' + afterHighlighted;
				}
			},
			/*
			** Makes the highlighted text be italic
			*/
			italic: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				if (highlighted !== '')
				{
					tag.value = beforeHighlighted + '<i>' + highlighted + '</i>' + afterHighlighted;
				}
			},
			/*
			** Makes the highlighted be striked (lined-through)
			*/
			strike: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				if (highlighted !== '')
				{
					tag.value = beforeHighlighted + '<del>' + highlighted + '</del>' + afterHighlighted;
				}
			},
			save: () =>
			{
				let inner = $('div.wysiwyg-frame').html();
				localStorage.setItem('text', inner);
				if (localStorage.length > 0)
				{
					alert('Saved !');
				};
				setInterval(() =>
				{
					let inner = $('div.wysiwyg-frame').html();
					localStorage.setItem('text', inner);
					console.log('Saved...');
				} , 300000);
			},
			video: (beforeHighlighted, highlighted, afterHighlighted) =>
			{
				let href = prompt('Video link: ');
				if (href !== null)
				{
					if (href.match('/video') !== null)
					{
						href = href.replace("/video/", "/embed/video/");
					}
					if (href.match('/watch') !== null)
					{
						href = href.replace("/watch?v=", "/embed/");
					}
					tag.value = beforeHighlighted + '<iframe src ="' + href + '"></iframe>' + afterHighlighted;
				}
			}

		};
		/*
		** Displays the buttons with corresponsing BEM class
		**
		** @var buttons (array): the list of buttons to display
		*/
		const display_buttons = (buttons) =>
		{
			buttons.forEach((button_name) =>
			{
				let button = $('<button>' + button_name + '</button>').addClass('wysiwyg-button').addClass('wysiwyg-button--' + button_name);
				$('div.toolbar').append($(button));
				$(button).click(() =>
				{
					let beforeHighlighted = tag.value.substring(0, tag.selectionStart);
					let highlightedText = tag.value.substring(tag.selectionStart, tag.selectionEnd);
					let afterHighlighted = tag.value.substring(tag.selectionEnd);
					$('div.wysiwyg-frame')[0].innerHTML = $('textarea.wysiwyg-frame')[0].value;
					callbacks[button_name](beforeHighlighted, highlightedText, afterHighlighted);
				});
			});
		};
		/*
		** Sets custom style on buttons
		*/
		const set_buttons_style = () =>
		{
			$('.wysiwyg-button--switch').text('').prepend('<i class="fas fa-sync-alt"></i>');
			$('.wysiwyg-button--justify').text('').prepend('<i class="fas fa-align-justify"></i>');
			$('.wysiwyg-button--left').text('').prepend('<i class="fas fa-align-left"></i>');
			$('.wysiwyg-button--center').text('').prepend('<i class="fas fa-align-center"></i>');
			$('.wysiwyg-button--right').text('').prepend('<i class="fas fa-align-right"></i>');
			$('.wysiwyg-button--color').text('').prepend('<i class="fas fa-paint-brush"></i>');
			$('.wysiwyg-button--size').text('').prepend('<i class="fas fa-text-height"></i>');
			$('.wysiwyg-button--thinner').text('').prepend('<i class="fas fa-long-arrow-alt-up"></i>');
			$('.wysiwyg-button--thicker').text('').prepend('<i class="fas fa-long-arrow-alt-down"></i>');
			$('.wysiwyg-button--link').text('').prepend('<i class="fas fa-link"></i>');
			$('.wysiwyg-button--bold').text('').prepend('<i class="fas fa-bold"></i>');
			$('.wysiwyg-button--italic').text('').prepend('<i class="fas fa-italic"></i>');
			$('.wysiwyg-button--strike').text('').prepend('<i class="fas fa-strikethrough"></i>');
			$('.wysiwyg-button--save').text('').prepend('<i class="fas fa-save"></i>');
			$('.wysiwyg-button--image').text('').prepend('<i class="fas fa-image"></i>');
			$('.wysiwyg-button--video').text('').prepend('<i class="fas fa-video"></i>');
		};
		const surroundingText = () =>
		{
			let start = tag.selectionStart;
			if ($('div.wysiwyg-frame').children().length > 0)
			{
				while (tag.value.charAt(tag.selectionStart - 1) !== '>')
				{
					if (tag.selectionStart === 0)
					{
						tag.selectionStart = tag.selectionEnd = start;
						return (null);
					}
					tag.selectionStart--;
				}
				while (tag.value.charAt(tag.selectionEnd) !== '<')
				{
					if (tag.selectionStart === tag.value.length)
					{
						tag.selectionStart = tag.selectionEnd = start;
						return (null);
					}
					tag.selectionEnd++;
				}
				let content = 
				{
					before: tag.value.substring(0, tag.selectionStart),
					surrounding_text: tag.value.substring(tag.selectionStart, tag.selectionEnd),
					after: tag.value.substring(tag.selectionEnd)
				};
				tag.selectionStart = tag.selectionEnd = start;
				return (content);
			}
			return (null);
		};
		/*
		** Returns the surrounding tag where the cursor is
		**
		** @return: the $(tag) around the cursor, or null if there isn't any
		*/
		const surroundingTag = () =>
		{
			let content = surroundingText();
			if (content === null)
			{
				return (null);
			}

			let surrounding_tag = null;
			$('div.wysiwyg-frame').children().each((index, node) =>
			{
				if ($(node).text() === content.surrounding_text)
				{
					surrounding_tag = node;
				}
			});
			return ({surrounding_tag, content});
		};
		/*
		** Restores last saved file
		*/
		const restore_session = () =>
		{
			if (localStorage.length > 0)
			{
				$('div.wysiwyg-frame').html(localStorage.getItem('text'));
				console.log('Session restored');
			}
		};
		/*
		** On exit, ask for confirmation
		*/
		const setup_confirm_on_exit = () =>
		{
			$(window).on('beforeunload', () =>
			{
				if ($('div.wysiwyg-frame').html() !== localStorage.getItem('text'))
				{
					return ('You have unsaved changes');
				}
			});
		};
		/******************* End of functions block *******************/




		/******************* Plugin initialization block *******************/
		display_buttons(object.buttons);
		set_buttons_style();
		restore_session();
		setup_confirm_on_exit();
		/*
		** Creates a new paragraph when 'Enter is pressed'
		*/
		$(tag).keypress((event) =>
		{
			if (event.key === 'Enter')
			{
				let before = tag.value.substring(0, tag.selectionStart);
				let position = tag.selectionStart;
				let after = tag.value.substring(tag.selectionStart);
				tag.value = before + '<p></p>' + after;
				tag.setSelectionRange(position + 3, position + 3);
			}
		});
		/******************* End of plugin initialization block *******************/
	});

	// Pour le chainage faut renvoyer l'objet
	return (this);
};

// Appel du plugin en lui passant un objet de propriétés (les accolades c'est la notation courte pour créer un objet en JS)
$('textarea').my_wysiwyg({
        buttons: ['save', 'switch', 'size', 'thinner', 'thicker', 'bold', 'italic', 'strike', 'color', 'left', 'center', 'right', 'justify', 'link', 'image', 'video'],
});

